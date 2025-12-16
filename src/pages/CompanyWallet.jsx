
import React, { useState } from "react";
import { Copy, CheckCircle, Wallet, Bitcoin, DollarSign, Globe, Upload } from "lucide-react";
import { motion } from "framer-motion";
import axiosClient from "../axiosClient/axiosClient";

const wallets = [
  {
    name: "Bitcoin Wallet",
    icon: <Bitcoin className="text-yellow-600" size={30} />,
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    network: "BTC Network",
  },
  {
    name: "USDT Wallet (TRC20)",
    icon: <DollarSign className="text-yellow-600" size={30} />,
    address: "TQ1x3q5p7dh8u4sw6x2p5d3f0g8v9w1z7c9",
    network: "Tron Network (TRC20)",
  },
  {
    name: "Ethereum Wallet",
    icon: <Globe className="text-yellow-600" size={30} />,
    address: "0x8b3d70A221f3c89Fb58aF0eaa5e2B8A7A72d8e67",
    network: "ERC20 Network",
  },
];

const CompanyWallet = () => {
  const [copied, setCopied] = useState("");

  // const [file, setFile] = useState(null);
  // const [transactionHash, setTransactionHash] = useState("");
  // const [senderAddress, setSenderAddress] = useState("");
  // const [amount, setAmount] = useState("");
  // const [comment, setComment] = useState("");

  const [paymentData, setPaymentData] = useState({
    listing_reference: "",
    email: "",
    property_type: "",
    invoice_id: "",
    crypto_currency: "",
    network: "",
    expected_amount: 0,
    amount_sent: 0,
    receiving_wallet: "",
    sender_wallet: "",
    tx_hash: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(address);
    setTimeout(() => setCopied(""), 2000);
  };

  // Convert selected image to base64
  // const convertToBase64 = (file) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare payload using paymentData
      const payload = {
        ...paymentData,
        payment_status: "pending",
        // user_id: , // Add logged-in user ID here
      };

      console.log("Submitting payload:", payload);

      await axiosClient.post("/payments", payload);

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);

      // Reset form fields
      setPaymentData({
        listing_reference: "",
        email: "",
        property_type: "",
        invoice_id: "",
        crypto_currency: "",
        network: "",
        expected_amount: 0,
        amount_sent: 0,
        receiving_wallet: "",
        sender_wallet: "",
        tx_hash: ""
      });

    } catch (error) {
      console.error("Submit error:", error);
      alert("Could not submit transaction");
    }
  };


  // return (
  //   <div className="bg-gradient-to-b from-white to-yellow-50 min-h-screen py-20 px-6 md:px-12">
  //     {/* Header */}
  //     <motion.h1
  //       initial={{ opacity: 0, y: -20 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       transition={{ duration: 0.6 }}
  //       className="text-center text-4xl md:text-5xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-700 mb-10"
  //       style={{ color: '#713F12' }}
  //     >
  //       Company Wallet Addresses
  //     </motion.h1>

  //     <motion.p
  //       initial={{ opacity: 0, y: 10 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       transition={{ duration: 0.7, delay: 0.1 }}
  //       className="text-center text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed"
  //     >
  //       Securely send your investments using the wallet addresses below. Ensure you send funds on the correct network to avoid loss of assets.
  //     </motion.p>

  //     {/* Wallet Cards */}
  //     <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
  //       {wallets.map((wallet, index) => (
  //         <motion.div
  //           key={wallet.name}
  //           initial={{ opacity: 0, y: 30 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.5, delay: index * 0.2 }}
  //           className="bg-white rounded-2xl shadow-lg p-6 text-center border border-yellow-100 hover:shadow-2xl transition-all duration-300"
  //         >
  //           <div className="flex justify-center mb-4">{wallet.icon}</div>
  //           <h2 className="text-xl font-semibold text-gray-900 mb-1">{wallet.name}</h2>
  //           <p className="text-sm text-gray-500 mb-4">{wallet.network}</p>

  //           <div className="bg-gray-100 rounded-lg p-3 mb-4 text-sm text-gray-700 break-words select-all">
  //             {wallet.address}
  //           </div>

  //           <button
  //             onClick={() => handleCopy(wallet.address)}
  //             style={{ backgroundColor: '#713F12' }}
  //             className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-sm font-semibold rounded-full shadow-md hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
  //           >
  //             {copied === wallet.address ? (
  //               <>
  //                 <CheckCircle size={18} /> Copied
  //               </>
  //             ) : (
  //               <>
  //                 <Copy size={18} /> Copy Address
  //               </>
  //             )}
  //           </button>
  //         </motion.div>
  //       ))}
  //     </div>

  //     {/* Payment Verification Section */}
  //     <motion.div
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1 }}
  //       transition={{ delay: 0.5 }}
  //       className="max-w-3xl mx-auto mt-20 bg-white p-10 rounded-3xl shadow-2xl border border-yellow-100"
  //     >
  //       <h2 className="text-3xl font-serif text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-700">
  //         Verify Your Payment
  //       </h2>
  //       <p className="text-center text-gray-600 mb-8">
  //         Upload a screenshot of your payment or provide a blockchain transaction link for verification.
  //       </p>

  //       <form onSubmit={handleSubmit} className="space-y-6">
  //         {/* Screenshot Upload */}
  //         <div className="flex flex-col items-center border-2 border-dashed border-yellow-400 rounded-xl p-6 hover:bg-yellow-50 transition">
  //           <Upload className="text-yellow-600 mb-3" size={30} />
  //           <label className="text-gray-700 font-medium mb-2">Upload Screenshot</label>
  //           <input
  //             type="file"
  //             accept="image/*"
  //             className="block text-sm text-gray-600 cursor-pointer file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-yellow-500 file:to-yellow-600 file:text-white hover:file:from-yellow-600 hover:file:to-yellow-700"
  //             onChange={(e) => setFile(e.target.files[0])}
  //           />
  //         </div>

  //         {/* Transaction Hash */}
  //         <div>
  //           <label className="block text-gray-700 font-medium mb-2">Transaction Link / Hash</label>
  //           <input
  //             type="text"
  //             value={transactionHash}
  //             onChange={(e) => setTransactionHash(e.target.value)}
  //             placeholder="Paste blockchain link or transaction hash..."
  //             className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
  //           />
  //         </div>

  //         {/* Sender's Address */}
  //         <div>
  //           <label className="block text-gray-700 font-medium mb-2">Sender's Address</label>
  //           <input
  //             type="text"
  //             value={senderAddress}
  //             onChange={(e) => setSenderAddress(e.target.value)}
  //             placeholder="Sender's wallet address..."
  //             className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
  //           />
  //         </div>

  //         {/* Amount */}
  //         <div>
  //           <label className="block text-gray-700 font-medium mb-2">Amount ($)</label>
  //           <input
  //             type="text"
  //             value={amount}
  //             onChange={(e) => setAmount(e.target.value)}
  //             placeholder="Amount sent in USD..."
  //             className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
  //           />
  //         </div>

  //         {/* Comment */}
  //         <div>
  //           <label className="block text-gray-700 font-medium mb-2">Further Comment</label>
  //           <input
  //             type="text"
  //             value={comment}
  //             onChange={(e) => setComment(e.target.value)}
  //             placeholder="Add further comment to your transaction..."
  //             className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
  //           />
  //         </div>

  //         {/* Submit Button */}
  //         <div className="text-center">
  //           <button
  //             style={{ backgroundColor: '#713F12' }}
  //             type="submit"
  //             className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-full shadow-md hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
  //           >
  //             Submit for Verification
  //           </button>
  //         </div>

  //         {submitted && (
  //           <motion.p
  //             initial={{ opacity: 0 }}
  //             animate={{ opacity: 1 }}
  //             className="text-green-600 text-center font-medium mt-4"
  //           >
  //             ✅ Your payment proof has been submitted successfully!
  //           </motion.p>
  //         )}
  //       </form>
  //     </motion.div>

  //     {/* Disclaimer */}
  //     <motion.div
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1 }}
  //       transition={{ delay: 0.8 }}
  //       className="mt-16 text-center text-gray-500 text-sm max-w-3xl mx-auto"
  //     >
  //       <Wallet className="mx-auto mb-3 text-yellow-600" size={28} />
  //       <p>
  //         Always verify the wallet address before making any transaction. Our team will never contact you via social media for payments.
  //       </p>
  //     </motion.div>
  //   </div>
  // );

   return (
    <div className="bg-gradient-to-b from-white to-yellow-50 min-h-screen py-20 px-6 md:px-12">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-4xl md:text-5xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-700 mb-10"
        style={{ color: "#713F12" }}
      >
        Company Wallet Addresses
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-center text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed"
      >
        Securely send your investments using the wallet addresses below. Ensure you send funds on the correct network to avoid loss of assets.
      </motion.p>

      {/* Wallet Cards */}
      <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
        {wallets.map((wallet, index) => (
          <motion.div
            key={wallet.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 text-center border border-yellow-100 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex justify-center mb-4">{wallet.icon}</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">{wallet.name}</h2>
            <p className="text-sm text-gray-500 mb-4">{wallet.network}</p>

            <div className="bg-gray-100 rounded-lg p-3 mb-4 text-sm text-gray-700 break-words select-all">
              {wallet.address}
            </div>

            <button
              onClick={() => handleCopy(wallet.address)}
              style={{ backgroundColor: "#713F12" }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-sm font-semibold rounded-full shadow-md hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
            >
              {copied === wallet.address ? (
                <>
                  <CheckCircle size={18} /> Copied
                </>
              ) : (
                <>
                  <Copy size={18} /> Copy Address
                </>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Payment Verification Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-3xl mx-auto mt-20 bg-white p-10 rounded-3xl shadow-2xl border border-yellow-100"
      >
        <h2 className="text-3xl font-serif text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-700" style={{ color: "#713F12" }}>
          Verify Your Payment
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Provide your payment details for verification.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Listing Reference */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Listing Reference</label>
            <input
              type="text"
              name="listing_reference"
              value={paymentData.listing_reference}
              onChange={handleChange}
              placeholder="Enter listing reference..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={paymentData.email}
              onChange={handleChange}
              placeholder="Enter your email..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Property Type</label>
            <select
              name="property_type"
              value={paymentData.property_type}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            >
              <option value="">Select property type</option>
              <option value="rent">Are you Renting this property?</option>
              <option value="Sell">Are you Selling this property?</option>
              <option value="buy">Are you buying this property?</option>

            </select>
          </div>

          {/* Invoice ID */}
          {/* <div>
            <label className="block text-gray-700 font-medium mb-2">Invoice ID</label>
            <input
              type="text"
              name="invoice_id"
              value={paymentData.invoice_id}
              onChange={handleChange}
              placeholder="Enter invoice ID..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div> */}

          {/* Crypto Currency */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Crypto Currency</label>
            <select
              name="crypto_currency"
              value={paymentData.crypto_currency}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            >
              <option value="">Select crypto currency</option>
              <option value="BTC">Bitcoin</option>
              <option value="USDT">USDT</option>
              <option value="ETH">Ethereum</option>
            </select>
          </div>

          {/* Network */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Network</label>
            <select
              name="network"
              value={paymentData.network}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            >
              <option value="">Select network</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="USDT TRC20">USDT TRC20</option>
            </select>
          </div>

          {/* Expected Amount */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Expected Amount ($)</label>
            <input
              type="number"
              name="expected_amount"
              value={paymentData.expected_amount}
              onChange={handleChange}
              placeholder="Enter expected amount..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          {/* Amount Sent */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Amount Sent ($)</label>
            <input
              type="number"
              name="amount_sent"
              value={paymentData.amount_sent}
              onChange={handleChange}
              placeholder="Enter amount sent..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          {/* Receiving Wallet */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Receiving Wallet</label>
            <input
              type="text"
              name="receiving_wallet"
              value={paymentData.receiving_wallet}
              onChange={handleChange}
              placeholder="Enter receiving wallet..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          {/* Sender Wallet */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Sender Wallet</label>
            <input
              type="text"
              name="sender_wallet"
              value={paymentData.sender_wallet}
              onChange={handleChange}
              placeholder="Enter sender wallet..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          {/* Transaction Hash */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Transaction Hash / Link</label>
            <input
              type="text"
              name="tx_hash"
              value={paymentData.tx_hash}
              onChange={handleChange}
              placeholder="Paste transaction hash or link..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              style={{ backgroundColor: "#713F12" }}
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-full shadow-md hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
            >
              Submit for Verification
            </button>
          </div>

          {submitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 text-center font-medium mt-4"
            >
              ✅ Your payment proof has been submitted successfully!
            </motion.p>
          )}
        </form>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center text-gray-500 text-sm max-w-3xl mx-auto"
      >
        <Wallet className="mx-auto mb-3 text-yellow-600" size={28} />
        <p>
          Always verify the wallet address before making any transaction. Our team will never contact you via social media for payments.
        </p>
      </motion.div>
    </div>
  );
};


export default CompanyWallet;






