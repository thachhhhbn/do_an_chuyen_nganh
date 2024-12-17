// Chuyển IP sang số nguyên
function ipToInt(ip) {
    return ip.split('.').reduce((int, octet) => (int << 8) + parseInt(octet), 0) >>> 0;
}

// Chuyển số nguyên thành IP
function intToIp(int) {
    return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join('.');
}

// Tính subnet mask từ số lượng hosts
function getSubnetMaskForHosts(hosts) {
    return 32 - Math.ceil(Math.log2(hosts + 2));
}

// Chuẩn hóa địa chỉ mạng từ IP và CIDR
function getNetworkAddress(ip, cidr) {
    const mask = -1 << (32 - cidr);
    return intToIp(ipToInt(ip) & mask);
}

// Chia subnet VLSM
function vlsmSubnetting(network, subnets) {
    const [ip, cidr] = network.split('/');
    let currentNetwork = ipToInt(getNetworkAddress(ip, parseInt(cidr)));

    subnets.sort((a, b) => b - a);
    const results = [];

    subnets.forEach(hosts => {
        const mask = getSubnetMaskForHosts(hosts);
        const subnetSize = Math.pow(2, 32 - mask);

        results.push({
            subnet: intToIp(currentNetwork),
            mask: `/${mask}`,
            hosts: subnetSize - 2,
            range: `${intToIp(currentNetwork + 1)} - ${intToIp(currentNetwork + subnetSize - 2)}`,
            broadcast: intToIp(currentNetwork + subnetSize - 1),
        });

        currentNetwork += subnetSize; // Cập nhật địa chỉ mạng cho subnet tiếp theo
    });

    return results;
}

// Xử lý tiến trình tiếp tục sau khi nhập mạng gốc
document.getElementById('next-button').addEventListener('click', () => {
    const networkInput = document.getElementById('network-input').value;

    if (!networkInput || !networkInput.includes('/')) {
        alert('Vui lòng nhập đúng mạng gốc (ví dụ: 172.16.1.100/19)');
        return;
    }
    document.getElementById('department-section').style.display = 'block';
});

// Tạo bảng nhập số lượng host
document.getElementById('generate-button').addEventListener('click', () => {
    const departmentCount = parseInt(document.getElementById('department-count').value);
    const tableBody = document.getElementById('host-table-body');
    tableBody.innerHTML = ''; // Xóa dữ liệu cũ

    if (departmentCount > 0) {
        document.getElementById('host-table-section').style.display = 'block';
        for (let i = 1; i <= departmentCount; i++) {
            tableBody.innerHTML += `
                <tr>
                    <td>Phòng ban ${i}</td>
                    <td><input type="number" class="host-input text-input" placeholder="Số lượng host" min="1" required></td>
                </tr>
            `;
        }
    }
});

// Xử lý và hiển thị kết quả chia mạng
document.getElementById('calculate-button').addEventListener('click', () => {
    const hostInputs = document.querySelectorAll('.host-input');
    const subnets = Array.from(hostInputs).map(input => parseInt(input.value)).filter(value => value > 0);
    const networkInput = document.getElementById('network-input').value;

    if (!networkInput || subnets.length === 0) {
        alert('Vui lòng nhập đầy đủ thông tin mạng gốc và số host!');
        return;
    }

    const results = vlsmSubnetting(networkInput, subnets);

    let output = `<div class="result-title">Kết quả chia mạng</div>
        <div class="table-wrapper">
            <table class="data-table">
                <thead>
                    <tr>
                        <th class="table-header">Subnet</th>
                        <th class="table-header">Subnet Mask</th>
                        <th class="table-header">Số Hosts</th>
                        <th class="table-header">Phạm vi IP</th>
                        <th class="table-header">Địa chỉ Broadcast</th>
                    </tr>
                </thead>
                <tbody>`;

    results.forEach(r => {
        output += `
            <tr>
                <td>${r.subnet}</td>
                <td>${r.mask}</td>
                <td>${r.hosts}</td>
                <td>${r.range}</td>
                <td>${r.broadcast}</td>
            </tr>
        `;
    });

    output += `</tbody></table></div>`;
    document.getElementById('result-section').innerHTML = output;
    document.getElementById('result-section').style.display = 'block';
});
