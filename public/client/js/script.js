// Hàm chuyển đổi IP sang nhị phân
function ipToBinary(ip) {
  return ip
    .split(".")
    .map((octet) => parseInt(octet, 10).toString(2).padStart(8, "0"))
    .join(".");
}

// Hàm chuyển đổi CIDR sang subnet mask nhị phân
function cidrToSubnetMaskBinary(cidr) {
  return ""
    .padStart(cidr, "1")
    .padEnd(32, "0")
    .match(/.{1,8}/g)
    .join(".");
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
document
  .querySelector('input[name="ip"]')
  .addEventListener("input", (event) => {
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

// // Hàm chuyển đổi từ nhị phân sang IP
function newBinaryToIp(binary) {
  return binary
    .split(".")
    .map((octet) => parseInt(octet, 2))
    .join(".");
}

function binaryToIp(binary) {
  return binary
    .split(".") // Tách chuỗi theo dấu chấm
    .map((octet) => parseInt(octet.padStart(8, "0"), 2)) // Đảm bảo mỗi phần có 8 bit
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

//ham moi
//thuc hien phep and de tinh subnet id
function getSubnetID(adrbyte, maskbyte) {
  return (adrbyte & maskbyte).toString();
}
// tinh broadcast bang phep xor
function getBroadcastAddress(adrbyte, maskbyte) {
  const invertedMask = 255 - maskbyte; // Calculate inverted netmask by subtracting from 255
  return (adrbyte | invertedMask).toString(); // Perform OR between IP byte and inverted netmask byte
}
// Chuyển đổi một byte thành chuỗi nhị phân
function convertToBinary(byte) {
  return byte.toString(2).padStart(8, "0"); // Đảm bảo luôn có 8 bit
}

// Tính số lượng địa chỉ khả dụng trong subnet
function getNumberOfAddresses(maskbyte1, maskbyte2, maskbyte3, maskbyte4) {
  // Chuyển các byte của subnet mask thành chuỗi nhị phân
  let netmask =
    convertToBinary(maskbyte1) +
    convertToBinary(maskbyte2) +
    convertToBinary(maskbyte3) +
    convertToBinary(maskbyte4);

  let exponent = 0;

  // Đếm số lượng bit 0 trong subnet mask
  for (let counter = 0; counter <= 31; counter++) {
    if (netmask[counter] === "0") {
      exponent++;
    }
  }

  // Tính số lượng địa chỉ khả dụng trong subnet (sau khi trừ đi 2 địa chỉ đặc biệt)
  return Math.pow(2, exponent) - 2;
}
// Chuyển đổi byte thành chuỗi nhị phân
function convertToBinary(byte) {
  return byte.toString(2).padStart(8, "0"); // Đảm bảo luôn có 8 bit
}

// Tìm bit 1 cao nhất trong subnet mask
function getHighestBit(maskbyte1, maskbyte2, maskbyte3, maskbyte4) {
  // Kết hợp tất cả các byte vào một chuỗi nhị phân dài 32 bit
  let netmask =
    convertToBinary(maskbyte1) +
    convertToBinary(maskbyte2) +
    convertToBinary(maskbyte3) +
    convertToBinary(maskbyte4);

  let bit = 0;

  // Duyệt qua từng bit trong chuỗi nhị phân
  for (let counter = 0; counter <= 31; counter++) {
    if (netmask.charAt(counter) === "1") {
      bit = counter;
      bit++; // Tăng chỉ số bit
    } else if (netmask.charAt(counter) === "0") {
      counter = 32; // Kết thúc vòng lặp khi gặp bit 0
    }
  }
  return bit;
}
// Chuyển đổi byte thành chuỗi nhị phân
function convertToBinary(byte) {
  return byte.toString(2).padStart(8, "0");
}

// Tìm bit 1 cao nhất trong subnet mask
function getHighestBit(maskbyte1, maskbyte2, maskbyte3, maskbyte4) {
  let netmask =
    convertToBinary(maskbyte1) +
    convertToBinary(maskbyte2) +
    convertToBinary(maskbyte3) +
    convertToBinary(maskbyte4);
  let bit = 0;

  for (let counter = 0; counter <= 31; counter++) {
    if (netmask.charAt(counter) === "1") {
      bit = counter;
      bit++;
    } else if (netmask.charAt(counter) === "0") {
      counter = 32;
    }
  }
  return bit;
}

// Tính số lượng bit 1 trong subnet mask (exponent)
function getExponent(maskbyte1, maskbyte2, maskbyte3, maskbyte4) {
  let bit = 0;
  let exponent = 0;

  bit = getHighestBit(maskbyte1, maskbyte2, maskbyte3, maskbyte4);

  if (bit >= 1 && bit <= 8) {
    for (let counter = 0; counter <= 7; counter++) {
      if (convertToBinary(maskbyte1).charAt(counter) === "1") {
        exponent++;
      }
    }
  } else if (bit >= 9 && bit <= 16) {
    for (let counter = 0; counter <= 7; counter++) {
      if (convertToBinary(maskbyte2).charAt(counter) === "1") {
        exponent++;
      }
    }
  } else if (bit >= 17 && bit <= 24) {
    for (let counter = 0; counter <= 7; counter++) {
      if (convertToBinary(maskbyte3).charAt(counter) === "1") {
        exponent++;
      }
    }
  } else if (bit >= 25 && bit <= 32) {
    for (let counter = 0; counter <= 7; counter++) {
      if (convertToBinary(maskbyte4).charAt(counter) === "1") {
        exponent++;
      }
    }
  }
  return exponent;
}
// Hàm tính số lượng subnet có thể tạo từ subnet mask
function getNumberOfSubnets(maskbyte1, maskbyte2, maskbyte3, maskbyte4) {
  return Math.pow(2, getExponent(maskbyte1, maskbyte2, maskbyte3, maskbyte4));
}

function getAvailableSubnets(
  oktett1,
  oktett2,
  oktett3,
  oktett4,
  maskbyte1,
  maskbyte2,
  maskbyte3,
  maskbyte4
) {
  let bit = 0;
  let exponent = 0;
  let inkrement = 0;
  let oktett = 0;

  exponent = getExponent(maskbyte1, maskbyte2, maskbyte3, maskbyte4);
  bit = getHighestBit(maskbyte1, maskbyte2, maskbyte3, maskbyte4);

  if (bit >= 1 && bit <= 8) {
    oktett = 1;
  } else if (bit >= 9 && bit <= 16) {
    oktett = 2;
  } else if (bit >= 17 && bit <= 24) {
    oktett = 3;
  } else if (bit >= 25 && bit <= 32) {
    oktett = 4;
  }

  let subnets = new Array(Math.pow(2, exponent));

  inkrement = Math.pow(
    2,
    8 - getExponent(maskbyte1, maskbyte2, maskbyte3, maskbyte4)
  );

  switch (oktett) {
    case 1:
      for (let counter = 0; counter <= 255 / inkrement - 1; counter++) {
        subnets[counter] = counter * inkrement + ".0.0.0";
      }
      subnets[Math.pow(2, exponent) - 1] =
        Math.pow(2, exponent) * inkrement - 1 + ".0.0.0";
      break;
    case 2:
      for (let counter = 0; counter <= 255 / inkrement - 1; counter++) {
        subnets[counter] = oktett1 + "." + counter * inkrement + ".0.0";
      }
      subnets[Math.pow(2, exponent) - 1] =
        oktett1 + "." + (Math.pow(2, exponent) * inkrement - 1) + ".0.0";
      break;
    case 3:
      for (let counter = 0; counter <= 255 / inkrement - 1; counter++) {
        subnets[counter] =
          oktett1 + "." + oktett2 + "." + counter * inkrement + ".0";
      }
      subnets[Math.pow(2, exponent) - 1] =
        oktett1 +
        "." +
        oktett2 +
        "." +
        (Math.pow(2, exponent) * inkrement - 1) +
        ".0";
      break;
    case 4:
      for (let counter = 0; counter <= 255 / inkrement - 1; counter++) {
        subnets[counter] =
          oktett1 + "." + oktett2 + "." + oktett3 + "." + counter * inkrement;
      }
      subnets[Math.pow(2, exponent) - 1] =
        oktett1 +
        "." +
        oktett2 +
        "." +
        oktett3 +
        "." +
        (Math.pow(2, exponent) * inkrement - 1);
      break;
  }

  return subnets;
}
//chuyen tu 29 sang 255.255.255.248
function cidrToSubnetMask(cidr) {
  let maskLength = parseInt(cidr, 10); // Lấy phần CIDR từ số nhập vào
  const mask = [];

  for (let i = 0; i < 4; i++) {
    if (maskLength >= 8) {
      mask.push(255); // Các octet đầu tiên đều là 255 (tương ứng với 11111111)
      maskLength -= 8;
    } else {
      mask.push(256 - Math.pow(2, 8 - maskLength)); // Tính giá trị octet còn lại
      maskLength = 0; // Đã xử lý hết bit CIDR
    }
  }

  return mask;
}
function subnetToWildcard(subnetMask) {
  // Chia Subnet Mask thành các octet
  let subnetOctets = subnetMask.map(Number);

  // Tính Wildcard Mask bằng cách lấy bổ sung (255 - octet)
  let wildcardOctets = subnetOctets.map((octet) => 255 - octet);

  return wildcardOctets.join(".");
}

function getNewBroadcastAddress(ip_binary, wildcardMask_binary) {
  // Chuyển các chuỗi nhị phân thành các số thập phân (từng byte)
  let ip_bytes = ip_binary.split(".").map((octet) => parseInt(octet, 2));
  let wildcard_bytes = wildcardMask_binary
    .split(".")
    .map((octet) => parseInt(octet, 2));

  // Thực hiện phép toán OR bitwise trên từng byte
  let broadcast_bytes = ip_bytes.map(
    (byte, index) => byte | wildcard_bytes[index]
  );

  // Chuyển lại các byte broadcast thành nhị phân và ghép lại thành chuỗi
  return broadcast_bytes
    .map((byte) => byte.toString(2).padStart(8, "0"))
    .join(".");
}

// Hàm chuyển đổi IP thành mảng các octet
function ipToOctets(ip) {
  return ip.split(".").map(Number);
}

// Hàm chuyển đổi mảng các octet thành IP
function octetsToIp(octets) {
  return octets.join(".");
}

// Hàm tính dải địa chỉ host từ địa chỉ mạng và địa chỉ broadcast
function calculateHostRange(networkAddress, broadcastAddress) {
  const networkOctets = ipToOctets(networkAddress);
  const broadcastOctets = ipToOctets(broadcastAddress);

  // Tính địa chỉ host đầu tiên
  const firstHostOctets = [...networkOctets];
  firstHostOctets[3] += 1; // Cộng 1 vào octet cuối cùng

  // Tính địa chỉ host cuối cùng
  const lastHostOctets = [...broadcastOctets];
  lastHostOctets[3] -= 1; // Trừ 1 vào octet cuối cùng

  // Chuyển đổi lại thành địa chỉ IP
  const firstHost = octetsToIp(firstHostOctets);
  const lastHost = octetsToIp(lastHostOctets);

  return { firstHost, lastHost };
}
//end ham moi
// Sự kiện tính toán mạng và hiển thị kết quả
const btnCalculate = document.querySelector("#calculateNetworkButton");
const btnDetail = document.querySelector(".btn_chitiet");
const resultContainer = document.querySelector(".result-container");
const detailTable = document.querySelector(".detail_ip");
btnCalculate.addEventListener("click", () => {
  const ip = document.querySelector('input[name="ip"]').value;
  const subnetMask = parseInt(
    document.querySelector('input[name="subnet-mask"]').value
  );
  var octets = ip.split(".");
  var subnet = cidrToSubnetMask(subnetMask);
  if (
    !validateIp(ip) ||
    isNaN(subnetMask) ||
    subnetMask < 0 ||
    subnetMask > 32
  ) {
    alert("Vui lòng nhập địa chỉ IP và Subnet Mask hợp lệ (0-32)");
    return;
  }
  var range_add = getAvailableSubnets(
    octets[0],
    octets[1],
    octets[2],
    octets[3],
    subnet[0],
    subnet[1],
    subnet[2],
    subnet[3]
  );
  let tong_so_duong_mang = 0;
  range_add.forEach(() => {
    tong_so_duong_mang++;
  });
  const bit_host = 32 - subnetMask;
  const so_host_co_the_dung = Math.pow(2, bit_host) - 2;
  resultContainer.innerHTML = `
      So bit host con lai la: ${bit_host} <br> 
      So host co the dung la: ${so_host_co_the_dung} <br>
      Tong so duong mang co the dung la: ${tong_so_duong_mang} <br>
  
    `;
  resultContainer.style.display = "block";
  btnDetail.style.display = "block";
});

btnDetail.addEventListener("click", () => {
  const ip = document.querySelector('input[name="ip"]').value;
  const subnetMask = parseInt(
    document.querySelector('input[name="subnet-mask"]').value
  );

  var octets = ip.split(".");
  var subnet = cidrToSubnetMask(subnetMask);
  var range_add = getAvailableSubnets(
    octets[0],
    octets[1],
    octets[2],
    octets[3],
    subnet[0],
    subnet[1],
    subnet[2],
    subnet[3]
  );

  resultContainer.innerHTML = ``;
  // detailTable.style.display = "block";
  // Nếu có các dãy IP, tạo bảng
  if (range_add && range_add.length > 0) {
    let tableHtml = `<table border="1"><thead><tr><th></th><th>Địa chỉ đường mạng</th>
      <th>Địa chỉ có thể sử dụng</th>
      <th>Địa chỉ broadcast</th>
      </tr>
      </thead><tbody>`;

    // Lặp qua mảng và tạo các dòng cho bảng
    range_add.forEach((address, index) => {
      let ip_binary = ipToBinary(address);
      let subnetmask = cidrToSubnetMask(subnetMask);
      let wildcardMask = subnetToWildcard(subnetmask);
      let broadcast = getNewBroadcastAddress(
        ip_binary,
        ipToBinary(wildcardMask)
      );
      const range = calculateHostRange(address, binaryToIp(broadcast));

      tableHtml += `<tr><td>${index + 1}</td><td>${address} </td><td>${
        range.firstHost + " ->" + range.lastHost
      } </td><td>${binaryToIp(broadcast)} </td></tr>`;
    });

    tableHtml += `</tbody></table>`;

    // Hiển thị bảng trong resultContainer
    resultContainer.innerHTML = tableHtml;
    // detailTable.style.display = "block";
    btnDetail.style.display = "none";
  } else {
    detailTable.innerHTML = "<p>Không có dãy IP khả dụng.</p>";
    d.style.display = "block";
  }
});
