//script lvt
function ipToBinary(ip) {
    const octets = ip.split(".");
    const binaryOctets = octets.map((octet) => {
        if (
            octet === ""
            || isNaN(octet)
            || parseInt(octet) > 255
            || parseInt(octet) < 0
        ) {
            return "";
        }
        return parseInt(octet, 10).toString(2).padStart(8, "0");
    });
    return binaryOctets.join(".");
}

function cidrToSubnetMask(cidr) {
    const mask = [];
    for (let i = 0; i < 4; i++) {
        const bits = Math.min(cidr, 8);
        mask.push(256 - Math.pow(2, 8 - bits));
        cidr -= bits;
    }
    return mask.join(".");
}

function cidrToBinary(cidr) {
    let binaryMask = "".padStart(cidr, "1").padEnd(32, "0");
    return binaryMask.match(/.{1,8}/g).join(".");
}

function updateBinaryIp() {
    const ipInput = document
        .querySelector('input[name="ip"]')
        .value;
    const subnetInput = document
        .querySelector('input[name="subnet-mask"]')
        .value;

    const ipBinaryOutput = document
        .querySelector(".ip-binary");
    const subnetBinaryOutput = document
        .querySelector(".subnet-mask-binary");
    const subnetNumberOutput = document
        .querySelector(".subnet-mask-number");

    ipBinaryOutput.value = ipToBinary(ipInput);

    if (subnetInput && !isNaN(parseInt(subnetInput))) {
        const cidr = parseInt(subnetInput);
        subnetBinaryOutput.value = cidrToBinary(cidr);
        subnetNumberOutput.value = cidrToSubnetMask(cidr);
    } else {
        subnetBinaryOutput.value = "";
        subnetNumberOutput.value = "";
    }
}

function validateIp(ip) {
    const octets = ip.split(".");
    if (octets.length !== 4) return false;

    return octets.every((octet) => {
        const num = parseInt(octet, 10);
        return !isNaN(num) && num >= 0 && num <= 255;
    });
}

function binaryToIp(binary) {
    return binary
        .match(/.{1,8}/g)
        .map((bin) => parseInt(bin, 2))
        .join(".");
}


const btn_tinh_tong_so_duong_mang = document
    .querySelector("#calculateNetworkButton");

var so_duong_subnet_mask = 0;
var so_host_tren_moi_subnet_mask = 0;
var so_bit_muon = 0;
var so_bit_host_con_lai = 0;
var octets;
btn_tinh_tong_so_duong_mang
    .addEventListener("click", () => {
        let subnetInput = document
            .querySelector('input[name="subnet-mask"]').value;
        let ipInput = document
            .querySelector('input[name="ip"]').value;

        if (
            !validateIp(ipInput)
            || isNaN(parseInt(subnetInput))
            || parseInt(subnetInput) < 0
            || parseInt(subnetInput) > 32
        ) {
            alert("Vui lòng nhập địa chỉ IP và Subnet Mask hợp lệ (0-32)");
            return;
        }
        octets = ipInput.split(".");
        let octet1 = parseInt(octets[0]);

        if (octet1 <= 126) {
            so_bit_muon = subnetInput - 8;
        } else if (octet1 > 127 && octet1 < 192) {
            so_bit_muon = subnetInput - 16;
        } else {
            so_bit_muon = subnetInput - 24;
        }
        so_bit_host =
            32 - subnetInput;
        so_subnet = Math
            .pow(2, so_bit_muon);
        so_host_tren_moi_subnet_mask = Math
            .pow(2, so_bit_host) - 2;


        const resultContainer = document
            .querySelector(".result-container");
        resultContainer.style.display = "block";
        resultContainer.innerHTML = "";
        const title = document
            .createElement("h1");
        title.textContent = "Kết quả tính toán";

        const bitHostConLai = document
            .createElement("p");
        bitHostConLai.textContent = `Số bit host còn lại: 
        ${so_bit_host}`;

        const subnetInfo = document
            .createElement("p");
        subnetInfo.textContent =
            `Số subnet: ${so_subnet}
            , Số host trên mỗi subnet: ${so_host_tren_moi_subnet_mask}`;
        const detailButton = document.createElement("button");
        detailButton.textContent = "Chi tiết";
        detailButton.style.marginTop = "10px";
        detailButton.addEventListener("click", () => {
            const element_chi_tiet = document
                .querySelector(".detail_ip");
            element_chi_tiet.style.display = "block";
            element_chi_tiet.innerHTML = "";
            element_chi_tiet.style.float = "left";
            const ips = ipInput.split(".");
            parseInt(ips[3]);
            ips[3] = 0;
            for (let i = 0; i < so_subnet; i++) {
                const network_class = document
                    .createElement("p");
                ips[3] += parseInt(so_bit_host);
                network_class.textContent = octets.join(".");
                console.log(network_class);
                element_chi_tiet.appendChild(network_class);
            }
        });
        resultContainer.appendChild(title);
        resultContainer.appendChild(bitHostConLai);
        resultContainer.appendChild(subnetInfo);
        resultContainer.appendChild(detailButton);
    })

// function btn_chi_tiet() {
//
// }





