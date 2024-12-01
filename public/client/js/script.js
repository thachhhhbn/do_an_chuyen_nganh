// Hàm chuyển đổi IP sang nhị phân
function ipToBinary(ip) {
  return ip
    .split(".")
    .map((octet) => parseInt(octet, 10).toString(2).padStart(8, "0"))
    .join(".");
}

// Hàm chuyển đổi CIDR sang subnet mask nhị phân
function cidrToSubnetMaskBinary(cidr) {
  return "".padStart(cidr, "1").padEnd(32, "0").match(/.{1,8}/g).join(".");
}

// Hàm kiểm tra IP hợp lệ
function validateIp(ip) {
  const octets = ip.split(".");
  return (
    octets.length === 4 &&
    octets.every((octet) => {
      const num = parseInt(octet, 10);
      return !isNaN(num) && num >= 0 && num <= 255;
    })
  );
}

// Sự kiện hiển thị mã nhị phân của IP
document.querySelector('input[name="ip"]').addEventListener("input", (event) => {
  const ip = event.target.value;
  const ipBinaryInput = document.querySelector(".ip_binary");

  if (validateIp(ip)) {
    ipBinaryInput.value = ipToBinary(ip);
  } else {
    ipBinaryInput.value = "IP không hợp lệ";
  }
});

// Sự kiện hiển thị mã nhị phân của subnet mask
document
  .querySelector('input[name="subnet-mask"]')
  .addEventListener("input", (event) => {
    const cidr = parseInt(event.target.value, 10);
    const subnetBinaryInput = document.querySelector(".subnet_binary");

    if (!isNaN(cidr) && cidr >= 0 && cidr <= 32) {
      subnetBinaryInput.value = cidrToSubnetMaskBinary(cidr);
    } else {
      subnetBinaryInput.value = "CIDR không hợp lệ";
    }
  });

// Hàm chuyển đổi từ nhị phân sang IP
function binaryToIp(binary) {
  return binary
    .match(/.{1,8}/g)
    .map((bin) => parseInt(bin, 2))
    .join(".");
}

// Hàm chuyển đổi CIDR sang Subnet Mask
function cidrToSubnetMask(cidr) {
  const maskBinary = "".padStart(cidr, "1").padEnd(32, "0");
  return maskBinary
    .match(/.{1,8}/g)
    .map((bin) => parseInt(bin, 2))
    .join(".");
}

// Hàm tính toán thông tin subnet
function calculateSubnet(ip, cidr) {
  if (!validateIp(ip)) {
    throw new Error("Địa chỉ IP không hợp lệ.");
  }
  if (isNaN(cidr) || cidr < 0 || cidr > 32) {
    throw new Error("CIDR không hợp lệ.");
  }

  const binaryIp = ipToBinary(ip).replace(/\./g, "");
  const networkBinary = binaryIp.slice(0, cidr).padEnd(32, "0");
  const broadcastBinary = binaryIp.slice(0, cidr).padEnd(32, "1");

  const subnetMask = cidrToSubnetMask(cidr);
  const networkAddress = binaryToIp(networkBinary);
  const broadcastAddress = binaryToIp(broadcastBinary);

  const totalAddresses = Math.pow(2, 32 - cidr);
  const usableAddresses = totalAddresses > 2 ? totalAddresses - 2 : 0;

  // Tạo usableRange
  const usableRange = [];
  if (usableAddresses > 0) {
    const firstHostBinary = (parseInt(networkBinary, 2) + 1)
      .toString(2)
      .padStart(32, "0");
    const lastHostBinary = (parseInt(broadcastBinary, 2) - 1)
      .toString(2)
      .padStart(32, "0");

    let currentHostBinary = firstHostBinary;
    while (
      parseInt(currentHostBinary, 2) <= parseInt(lastHostBinary, 2) &&
      usableRange.length < usableAddresses
    ) {
      usableRange.push(binaryToIp(currentHostBinary));
      currentHostBinary = (
        parseInt(currentHostBinary, 2) + 1
      )
        .toString(2)
        .padStart(32, "0");
    }
  }

  return {
    subnetMask,
    networkAddress,
    broadcastAddress,
    totalAddresses,
    usableAddresses,
    usableRange,
  };
}

// Sự kiện tính toán mạng và hiển thị kết quả
const btnCalculate = document.querySelector("#calculateNetworkButton");
const btnDetail = document.querySelector(".btn_chitiet");

btnCalculate.addEventListener("click", () => {
  const ip = document.querySelector('input[name="ip"]').value;
  const subnetMask = parseInt(
    document.querySelector('input[name="subnet-mask"]').value
  );

  if (
    !validateIp(ip) ||
    isNaN(subnetMask) ||
    subnetMask < 0 ||
    subnetMask > 32
  ) {
    alert("Vui lòng nhập địa chỉ IP và Subnet Mask hợp lệ (0-32)");
    return;
  }

  try {
    const result = calculateSubnet(ip, subnetMask);

    // Hiển thị bảng kết quả
    const resultContainer = document.querySelector(".result-container");
    resultContainer.innerHTML = `
            <table border="1" style="border-collapse: collapse; width: 100%; text-align: left;">
                <tr>
                    <th>Subnet Mask</th>
                    <th>Network Address</th>
                    <th>Broadcast Address</th>
                    <th>Total Addresses</th>
                    <th>Usable Addresses</th>
                </tr>
                <tr>
                    <td>${result.subnetMask}</td>
                    <td>${result.networkAddress}</td>
                    <td>${result.broadcastAddress}</td>
                    <td>${result.totalAddresses}</td>
                    <td>${result.usableAddresses}</td>
                </tr>
            </table>
        `;
    resultContainer.style.display = "block";

    btnDetail.dataset.usableRange = JSON.stringify(result.usableRange); // Cập nhật dữ liệu usableRange
    btnDetail.style.display = "block"; // Hiển thị nút
  } catch (error) {
    console.error("Lỗi:", error.message);
    alert("Đã xảy ra lỗi khi tính toán. Vui lòng kiểm tra lại dữ liệu đầu vào.");
  }
});

btnDetail.addEventListener("click", () => {
  try {
    const usableRange = JSON.parse(btnDetail.dataset.usableRange || "[]");
    const detailContainer = document.querySelector(".detail_ip");
  
    if (usableRange.length === 0) {
      detailContainer.innerHTML = `<p>Không có địa chỉ sử dụng được.</p>`;
    } else {
      detailContainer.innerHTML = `<p>Danh sách địa chỉ sử dụng được:</p><ul>`;
      usableRange.forEach((address, index) => {
        detailContainer.innerHTML += `<li>${index + 1}. ${address}</li>`;
      });
      detailContainer.innerHTML += `</ul>`;
    }
    detailContainer.style.display = "block";
  } catch (error) {
    console.error("Lỗi:", error.message);
    alert("Đã xảy ra lỗi khi hiển thị danh sách chi tiết.");
  }
});
