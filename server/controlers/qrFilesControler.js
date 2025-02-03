const QrFiles = require('../models/qrFiles'); // Adjust the path as necessary
const filehandle = require('../middleware/filehandle'); // Ensure you have a utility for handling file uploads

const uploadqrFilesFiles = async (req, res) => {
    try {
        let imageUrl = null;
        let pdfUrl = null;

        if (req.files) {
            if (req.files.image) {
                imageUrl = await filehandle.uploadFile(req.files.image, 'qrFiles');
            }
            if (req.files.pdf) {
                pdfUrl = await filehandle.uploadFile(req.files.pdf, 'qrFiles');
            }
        }

        // console.log(req.files.pdf);
        

        const qrFiles = new QrFiles({
            image: imageUrl,
            pdf: pdfUrl
        });

        await qrFiles.save();
        if(imageUrl){
            return res.status(200).send({"url":imageUrl});
        } 
        if(pdfUrl){
            return res.status(200).send({"url":pdfUrl});
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

module.exports = { uploadqrFilesFiles };