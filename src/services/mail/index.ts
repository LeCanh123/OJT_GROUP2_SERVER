import * as nodemailer from 'nodemailer';

interface mailOptions{
    to:string,
    subject:string,
    html?:string,
    text?:string,
    }

export default {
    sendMail: async (mailOptions:any) => {
        console.log("mailOptions",mailOptions);
        console.log("process.env.MS_USER",process.env.MS_USER);
        
        try {

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MS_USER,
                    pass: process.env.MS_PW
                }
            });
            
           let abc= await transporter.sendMail({
                from: 'canhtest01233210@gmail.com',
                ...mailOptions
            });
        console.log(abc);
            return true
        }catch (err) {
            console.log("err",err);
            
            return false
        }
    }
}

// {
//     to: "ngoccanh124937@gmail.com",
//     subject: "Thử nghiệm send mail with node js aaaa",
//     html: template
// }