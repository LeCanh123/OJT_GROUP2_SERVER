interface MailBody {
  productName: string;
  productWebUrl: string;
  receiverName: string;
  title: string;
  place: string;
  level: number;
  timeStart: Date;
}

function genEmailString(mailBody: MailBody) {
  const emailContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333333; 
          }
          h1 {
            color: #333333;
          }
          h3{
            color: #000;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            font-size: 17px;
          }
          th {
            background-color: #f5f5f5;
            text-align: left;
            padding: 10px;
            border: 1px solid #dddddd;
            color: #d10014;
          }
          td {
            padding: 10px;
            border: 1px solid #dddddd;
            color: #000;
          }
          p {
            margin-bottom: 20px;
            color: #000;
            font-size: 17px;
            line-height: 2;
          }
          a {
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
          }
          a:hover {
            text-decoration: underline;
          }
          .footer {
            color: #888888;
            font-size: 14px;
            margin-top: 40px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h1>THÔNG BÁO THIÊN TAI - HỆ THỐNG CẢNH BÁO THIÊN TAI VIỆT NAM</h1>
        <h3>Chào ${mailBody.receiverName},</h3>
        <p>Theo các nguồn thông tin cập nhật từ các cơ quan chức năng trong thời gian gần đây, chúng tôi đã ghi nhận một số trường hợp động đất xảy ra ở một số vùng trong nước. Dưới đây là những thông tin mới nhất được cập nhật:</p>
        <table>
          <tr>
            <th>Tiêu đề</th>
            <th>Khu vực ảnh hưởng</th>
            <th>Mức độ</th>
            <th>Thời gian</th>
          </tr>
          <tr>
            <td>${mailBody.title}</td>
            <td>${mailBody.place}</td>
            <td>${mailBody.level}</td>
            <td>${mailBody.timeStart}</td>
          </tr>
        </table>
        <p>Chúng tôi khuyến nghị mọi người nên thực hiện những biện pháp cần thiết để đảm bảo an toàn cá nhân và gia đình trong trường hợp động đất xảy ra. Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, vui lòng <a href="http://ccdpc.gov.vn/default.aspx">liên hệ</a> với chúng tôi hoặc các cơ quan chức năng địa phương.</p>
        <p class="footer">© ${new Date().getFullYear()} ${
          mailBody.productName
        }. All rights reserved.</p>
      </body>
    </html>
  `;

  return emailContent;
}

export default genEmailString;
