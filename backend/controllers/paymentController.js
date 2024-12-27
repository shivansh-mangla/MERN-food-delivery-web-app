import qrcode from 'qrcode'

//get qr code of payment
const makeQRCode = async (req, res)=>{
  const { amount, transactionNote } = req.body;

  if(!amount)
      return res.json({success:false, message:"Error!! Amount not specified"})
  
  const upiString = `upi://pay?pa=8588899023@ptaxis&pn=TomatoFoodDel&am=${amount}&cu=INR&tn=${transactionNote || ''}`;

  try {
    const qrCode = await qrcode.toDataURL(upiString); // Generate QR code as base64
    res.json({success:true, qrCode})
  } catch (error) {
    console.error('Error generating QR code:', error);
    return res.json({success:false, message:"Error in generating QR code"})
  }
}

export {makeQRCode};