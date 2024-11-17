import React from 'react'
type Printt = {
    isVisible: boolean;
    onClose: (isClose: boolean) => void;
}
const Print: React.FC<Printt> = ({ isVisible, onClose }) => {
    if (!isVisible) return null;
    const handlePrint = () => {
        const printContent = document.querySelector('#print-popup-content .popup-body')?.innerHTML;
        
        if (printContent) {
            const iframe = document.createElement('iframe');
            iframe.style.position = 'absolute';
            iframe.style.width = '0';
            iframe.style.height = '0';
            iframe.style.border = 'none';
            document.body.appendChild(iframe);

            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            if (iframeDoc) {
                iframeDoc.open();
                iframeDoc.write(`
                    <html>
                        <head>
                            <title>Print</title>
                            <style>
                              body {
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    margin: 0;
                                    font-family: Arial, sans-serif;
                                    padding: 10px;
                                    line-height: 1.4;
                                    font-size: 16px;
                                }
                                .content {
                                    max-width: 100%;
                                    padding: 0;
                                    margin: 0;
                                }
                                .text-lg {
                                    font-size: 1.125rem;
                                    margin-bottom: 8px;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="content">
                                ${printContent}
                            </div>
                        </body>
                    </html>
                `);
                iframeDoc.close();

                iframe.onload = () => {
                    iframe.contentWindow?.focus();
                    iframe.contentWindow?.print();
                    document.body.removeChild(iframe);
                };
            }
        }
    };


  return (
      <div className='fixed inset-0 z-50 flex ps-[25%] items-center '>
          <div  id="print-popup-content" className="popup-content w-[35%] h-[35%] print-content shadow-[3px_0px_10px_2px_#0B6279] bg-white rounded-xl">
              <div className="relative">
                <button onClick={() => onClose(true)} className='bg-[#84D2D89C] font-semibold px-2 rounded-lg absolute right-4 top-3'> 
                    x
                </button>
              </div>
              <div className="flex-col popup-body justify-self-center py-[10%]">
                  <p className="text-lg">Guest Name     :<span>Belia</span></p>
                  <p className="text-lg">Checkin Date   :<span>Belia</span></p>
                  <p className="text-lg">Checkout Date :<span>Belia</span></p>
                  <p className="text-lg">No of Room :<span>Belia</span></p>
                  <p className="text-lg">Guest Name :<span>Belia</span></p>
                  <p className="text-lg">Guest Name :<span>Belia</span></p>
                  <p className="text-lg">Guest Name :<span>Belia</span></p>
              </div>
              <div className="relative">
                <button onClick={handlePrint} className='bg-[#84D2D89C]  px-2 rounded-lg absolute right-4'> 
                    Print
                </button>
              </div>
          </div>
    </div>
  )
}

export default Print