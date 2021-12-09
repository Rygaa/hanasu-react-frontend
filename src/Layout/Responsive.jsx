import { useEffect, useState } from "react";


function Responsive() {
    const [initialFontSize, setInitialFontSize] = useState('16px')
    function responsiveFunc(element) {
        const html = document.documentElement
        const fontSize = window.getComputedStyle(html).fontSize.split('p')[0];
        const media = element.media;
        if (media === '(max-height: 850px)' && element.matches) {
            if (fontSize > 15) {
                html.style.fontSize = "1px";
            }
        } else if (!element.matches) {
            console.log('x');
            html.style.fontSize = "16px";
        }

    }

    useEffect(() => {
        var w1200 = window.matchMedia("(max-width: 1200px)")
        var w1050 = window.matchMedia("(max-width: 1050px)")
        var w950 = window.matchMedia("(max-width: 950px)")
        var w600 = window.matchMedia("(max-width: 600px)")
        var w400 = window.matchMedia("(max-width: 400px)")
        var h850 = window.matchMedia("(max-height: 850px)")
        var h800 = window.matchMedia("(max-height: 800px)")
        var h750 = window.matchMedia("(max-height: 750px)")
        h850.addListener(responsiveFunc)
        h800.addListener(responsiveFunc)
        h750.addListener(responsiveFunc)
    }, [])



    return (
        <div>

        </div>
    );
}

export default Responsive;
