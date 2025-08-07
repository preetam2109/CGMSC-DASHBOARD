// NotoSansDevanagari font (base64 encoded, full string)
const notoSansDevanagari = "AAEAAAAUAQAABABAR0RFRjXcCDUAAEx4AAAc6EdQT1ONwQNSAACkcAAAlFRHU1VCiRPvIQABOMQAAPvkSFZBUrZc4fMAACVoAAASWU9TLzIBPdU3AAACHAAAAGBTVEFUAh30+QAAAyAAAADeYXZhcup/+8MAAAHYAAAARGNtYXBwQ7+YAAA3xAAAFLRmdmFyFSVe/wAAAnwAAACkZ2FzcAAAABAAAAFUAAAACGdseWZ8xjD9AAI0qAABnxhndmFyNYIZQAAD08AABflSaGVhZBbpbD4AAAGgAAAANmhoZWEH"; // <-- Use full base64 string here

(function(jsPDFAPI) {
  jsPDFAPI.addFileToVFS("NotoSansDevanagari.ttf", notoSansDevanagari);
  jsPDFAPI.addFont("NotoSansDevanagari.ttf", "NotoSansDevanagari", "normal");
})(jsPDF.API);
