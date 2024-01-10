import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const GenericPdfDownloader = ({rootElementId , downloadFileName , setShowBtns}) => {

    const downloadPdfDocument = () => {

        const input = document.getElementById(rootElementId);
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 10, 0);
                pdf.save(`${downloadFileName}.pdf`);
            })
    }

    const hideBtns = () =>{
        setShowBtns(false)
    }

    const displayBtns = () =>{
        setShowBtns(true)
    }
    

    return (
    <button id="downloadBtn" onClick={downloadPdfDocument} onMouseEnter={hideBtns} onMouseLeave={displayBtns}>Download PDF</button>
    )

}

export default GenericPdfDownloader;