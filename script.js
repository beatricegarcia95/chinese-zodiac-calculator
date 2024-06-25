document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate');
    const birthYearInput = document.getElementById('birth-year');
    const birthMonthInput = document.getElementById('birth-month');
    const birthDayInput = document.getElementById('birth-day');
    const resultDiv = document.getElementById('result');
    const zodiacSign = document.getElementById('zodiac-sign');
    const zodiacImage = document.getElementById('zodiac-image');

    // Create custom popup elements
    const popup = document.createElement('div');
    popup.className = 'custom-popup';
    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    const popupMessage = document.createElement('p');
    const popupCloseBtn = document.createElement('button');
    popupCloseBtn.textContent = 'Close';
    popupContent.appendChild(popupMessage);
    popupContent.appendChild(popupCloseBtn);
    popup.appendChild(popupContent);
    document.body.appendChild(popup);

    // Function to show custom popup
    function showPopup(message) {
        popupMessage.textContent = message;
        popup.style.display = 'flex';
    }

    // Event listener for popup close button
    popupCloseBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    const zodiacSigns = [
        "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
        "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"
    ];

    const lunarNewYearDates = {
        1960: [1, 28], 1961: [2, 15], 1962: [2, 5],  1963: [1, 25], 1964: [2, 13],
        1965: [2, 2],  1966: [1, 21], 1967: [2, 9],  1968: [1, 30], 1969: [2, 17],
        1970: [2, 6],  1971: [1, 27], 1972: [2, 15], 1973: [2, 3],  1974: [1, 23],
        1975: [2, 11], 1976: [1, 31], 1977: [2, 18], 1978: [2, 7],  1979: [1, 28],
        1980: [2, 16], 1981: [2, 5],  1982: [1, 25], 1983: [2, 13], 1984: [2, 2],
        1985: [2, 20], 1986: [2, 9],  1987: [1, 29], 1988: [2, 17], 1989: [2, 6],
        1990: [1, 27], 1991: [2, 15], 1992: [2, 4],  1993: [1, 23], 1994: [2, 10],
        1995: [1, 31], 1996: [2, 19], 1997: [2, 7],  1998: [1, 28], 1999: [2, 16],
        2000: [2, 5],  2001: [1, 24], 2002: [2, 12], 2003: [2, 1],  2004: [1, 22],
        2005: [2, 9],  2006: [1, 29], 2007: [2, 18], 2008: [2, 7],  2009: [1, 26],
        2010: [2, 14], 2011: [2, 3],  2012: [1, 23], 2013: [2, 10], 2014: [1, 31],
        2015: [2, 19], 2016: [2, 8],  2017: [1, 28], 2018: [2, 16], 2019: [2, 5],
        2020: [1, 25], 2021: [2, 12], 2022: [2, 1],  2023: [1, 22]
    };

    calculateBtn.addEventListener('click', function() {
        const birthYear = parseInt(birthYearInput.value);
        const birthMonth = parseInt(birthMonthInput.value);
        const birthDay = parseInt(birthDayInput.value);
        
        if (isNaN(birthYear) || birthYear < 1960 || birthYear > 2023 ||
            isNaN(birthMonth) || birthMonth < 1 || birthMonth > 12 ||
            isNaN(birthDay) || birthDay < 1 || birthDay > 31) {
            showPopup("Please enter a valid date between 1960 and 2023.");
            return;
        }

        const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
        let zodiacYear = birthYear;

        if (lunarNewYearDates[birthYear]) {
            const lunarNewYear = new Date(birthYear, lunarNewYearDates[birthYear][0] - 1, lunarNewYearDates[birthYear][1]);
            if (birthDate < lunarNewYear) {
                zodiacYear -= 1;
            }
        } else {
            showPopup("Lunar New Year data not available for this year. The result may not be accurate.");
        }

        const zodiacIndex = (zodiacYear - 1900) % 12;
        const zodiac = zodiacSigns[zodiacIndex];

        zodiacSign.textContent = zodiac;
        zodiacImage.src = `images/${zodiac.toLowerCase()}.png`;
        zodiacImage.alt = zodiac;

        resultDiv.classList.remove('hidden');
        resultDiv.classList.add('visible');
    });
});
