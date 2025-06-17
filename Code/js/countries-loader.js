document.addEventListener("DOMContentLoaded", () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            const countrySelect = document.getElementById("country");
            countrySelect.innerHTML = "";
            data.sort((a, b) => a.name.common.localeCompare(b.name.common)).forEach(country => {
                const option = document.createElement("option");
                option.value = country.name.common;
                option.textContent = country.name.common;
                countrySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error loading countries:", error);
            const countrySelect = document.getElementById("country");
            countrySelect.innerHTML = '<option value="">Failed to load countries</option>';
        });
});