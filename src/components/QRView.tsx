import { QRCodeSVG } from "qrcode.react";
import { Download, Share2, ArrowLeft, QrCode } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function QRView() {
  const menuUrl = window.location.origin;
  const navigate = useNavigate();

  const downloadQR = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      const padding = 60;
      const size = img.width + padding * 2;
      canvas.width = size;
      canvas.height = size;

      // Fill background
      ctx.fillStyle = "#FCF9F2"; // Ivory background
      ctx.fillRect(0, 0, size, size);

      // Draw border
      ctx.strokeStyle = "#C9A45B"; // Gold border
      ctx.lineWidth = 8;
      ctx.strokeRect(20, 20, size - 40, size - 40);

      // Draw inner white area for QR
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(padding - 10, padding - 10, img.width + 20, img.height + 20);

      // Draw QR Code
      ctx.drawImage(img, padding, padding);

      // Add text label
      ctx.fillStyle = "#3B3B3B";
      ctx.font = "bold 20px serif";
      ctx.textAlign = "center";
      ctx.fillText("MORYA'S ROYAL TREAT", size / 2, size - 30);

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "moryas-royal-treat-qr.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold rounded-full blur-[120px]" />
      </div>

      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/")}
        className="absolute top-8 left-8 text-white/60 hover:text-gold flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors z-20"
      >
        <ArrowLeft size={16} /> Back to Menu
      </motion.button>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-xl p-1 rounded-[2.5rem] border border-white/10 shadow-2xl">
          <div className="bg-ivory p-8 rounded-[2.4rem] flex flex-col items-center relative overflow-hidden">
            {/* Decorative Frame */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-gold rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-gold rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-gold rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-gold rounded-br-3xl" />

            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gold/10 p-3 rounded-2xl">
                  <QrCode className="text-gold" size={32} />
                </div>
              </div>
              <h2 className="font-royal text-3xl text-charcoal mb-2">DIGITAL MENU</h2>
              <div className="gold-divider w-20 mx-auto mb-3" />
              <p className="text-[10px] tracking-[0.4em] text-gold font-black uppercase">Morya's Royal Treat</p>
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] mb-10 relative group"
            >
              <QRCodeSVG
                id="qr-code-svg"
                value={menuUrl}
                size={240}
                level="H"
                includeMargin={false}
                imageSettings={{
                  src: `data:image/svg+xml;base64,${btoa(`
                    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" rx="20" fill="#C9A45B" />
                      <text x="50" y="70" text-anchor="middle" font-family="serif" font-weight="bold" font-size="65" fill="white">R</text>
                    </svg>
                  `)}`,
                  x: undefined,
                  y: undefined,
                  height: 54,
                  width: 54,
                  excavate: true,
                }}
              />
              <div className="absolute inset-0 border-2 border-gold/5 rounded-3xl pointer-events-none group-hover:border-gold/20 transition-colors" />
            </motion.div>

            <div className="flex flex-col gap-3 w-full">
              <button 
                onClick={downloadQR}
                className="w-full bg-gold text-white py-4 rounded-2xl font-bold text-xs tracking-widest flex items-center justify-center gap-3 shadow-xl hover:bg-gold/90 transition-all active:scale-95"
              >
                <Download size={18} /> DOWNLOAD QR CODE
              </button>
              <button 
                onClick={() => navigator.share({ url: menuUrl, title: "Morya's Royal Treat Menu" })}
                className="w-full bg-charcoal text-white py-4 rounded-2xl font-bold text-xs tracking-widest flex items-center justify-center gap-3 shadow-xl hover:bg-charcoal/90 transition-all active:scale-95"
              >
                <Share2 size={18} /> SHARE LINK
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-white/30 text-[9px] tracking-[0.5em] uppercase font-bold">Premium Rooftop Dining Experience</p>
        </div>
      </motion.div>
    </div>
  );
}
