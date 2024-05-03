const currency = amt => "$" + amt.toFixed(2);
const percent = p => (p * 100).toFixed(0) + "%";

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("estimate").addEventListener("click", ()=>{

        let total = 0;
        const name = document.getElementById("guestName").value;
        const email = document.getElementById("guestEmail").value;
        const checkInDate = new Date(document.getElementById("checkInDate").value);
        const nights = Number(document.getElementById("nights").value);

        let room = "queen";
        if(document.getElementById("king").checked){
            room = "king";
        } else if(document.getElementById("suite").checked){
            room = "suite";
        }
            
        const adults = Number(document.getElementById("adults").value);
        const children = Number(document.getElementById("children").value);
       
        let discount = 0;
        if(document.getElementById("discountAAASenior").checked){
            discount = .10;
        } else if(document.getElementById("discountMilitary").checked){
            discount = .20;
        }

        //TODO CALCULATE TOTAL
        const m = checkInDate.getMonth();
        const JUNE = 5; // 0 based e. January is zero
        const AUGUST = 7; // 0 based e. January is zero
        let peakSeason = (m >= JUNE && m <= AUGUST);

        let rate = 150;

        if(room=="suite" && peakSeason){
            rate = 350;
        }else if(room == "suite" && !peakSeason){
            rate = 210;
        }else if(peakSeason){
            rate = 250;
        }

        total = nights * rate;
        const discountAmount = total * discount;
        const discountedTotal = total - discountAmount;

        const text = `
        Name: ${name}
        Email: ${email}
        Date: ${checkInDate.toLocaleDateString()}
        Is Peak Season: ${peakSeason}
        Nights: ${nights}
        Room: ${room}
        Adults: ${adults}
        Children: ${children}

        SubTotal: ${currency(total)}

        Discount Percent: ${percent(discount)}
        Discount Amount: ${currency(discountAmount)}

        Discounted Total: ${currency(discountedTotal)}
        
        `;
        output.innerText = text;
    });
    
});//END LOADED