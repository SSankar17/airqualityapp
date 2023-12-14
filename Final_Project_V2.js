document.addEventListener('DOMContentLoaded', (event) => {
    // Center the map on the United States
    var usCenterCoordinates = [37.0902, -95.7129];
    var map = L.map('map').setView(usCenterCoordinates, 4);

    // Add OpenStreetMap tiles to the map
    var osmLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add Air Quality Index layer to the map
    var aqiLayer = L.tileLayer('https://tiles.aqicn.org/tiles/usepa-aqi/{z}/{x}/{y}.png', {
        attribution: 'Air Quality Tiles &copy; <a href="http://waqi.info">waqi.info</a>'
    }).addTo(map);

    // Event listener for form submission to update the map
    document.getElementById('coordinatesForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

        // Retrieve latitude and longitude from the input fields
        var latitude = parseFloat(document.getElementById('latitude').value);
        var longitude = parseFloat(document.getElementById('longitude').value);

        // Check if latitude and longitude are valid numbers
        if (!isNaN(latitude) && !isNaN(longitude)) {
            // Update the map view to the new coordinates
            map.setView([latitude, longitude], map.getZoom());

            // Construct the API endpoint with the new coordinates
            var apiURL = 'http://api.waqi.info/feed/geo:' + latitude + ';' + longitude + '/?token=dc1e2a20de49d69ad47576d53b91f5f465b6a9a6';

            // Fetch AQI data from the API
            fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                var detailsContainer = document.getElementById('aqi-details-container');

                // Display AQI data with bold titles
                detailsContainer.innerHTML = `
                    <strong>Air Quality Index:</strong> ${data.data.aqi}<br>
                    <strong>Dominant Pollutant:</strong> ${data.data.dominentpol}<br>
                    <strong>Humidity:</strong> ${data.data.iaqi.h.v}%<br>
                    <strong>Temperature:</strong> ${data.data.iaqi.t.v}°C<br>
                    <strong>Pressure:</strong> ${data.data.iaqi.p.v} hPa<br>
                    <strong>City:</strong> ${data.data.city.name}<br>
                    <strong>Attribution Sources:</strong> ${data.data.attributions.map(source => source.name).join(', ')}<br>
                    <strong>Time:</strong> ${data.data.time.s}<br>
                `;
            })
            .catch(error => {
                console.error('Error fetching AQI data:', error);
            });
        } else {
            // Alert the user if the latitude and longitude are invalid
            alert('Please enter valid latitude and longitude values');
        }
    });

    // Function to fetch and display Supabase table data
    function fetchAndDisplaySupabaseData() {
        // Fetch data from your server's /data endpoint
        fetch('http://localhost:3000/data')
            .then(response => response.json())
            .then(data => {
                // Store the data in a variable
                const supabaseData = data;

                // Data has been retrieved successfully, now display it in the new container
                const supabaseDataContainer = document.getElementById('supabase-data-container');

                // Clear the existing data
                supabaseDataContainer.innerHTML = '';

                // Create an HTML table element
                const table = document.createElement('table');

                // Create a table header row
                const headerRow = table.insertRow(0);

                // Add table headers based on the keys in your data
                for (let key in supabaseData[0]) {
                    const headerCell = document.createElement('th');
                    headerCell.textContent = key;
                    headerRow.appendChild(headerCell);
                }

                // Iterate through the data and populate the table
                supabaseData.forEach((rowData, index) => {
                    const row = table.insertRow(index + 1); // +1 to skip the header row

                    // Add table cells with data
                    for (let key in rowData) {
                        const cell = row.insertCell();
                        cell.textContent = rowData[key];
                    }
                });

                // Append the table to the container
                supabaseDataContainer.appendChild(table);
            })
            .catch(error => {
                console.error('Error fetching Supabase data:', error);
            });
    }

    // Add an event listener to the form for form submission
    document.getElementById('coordinatesForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission
        fetchAndDisplaySupabaseData(); // Call the function to fetch and display Supabase data
    });

    // Initial fetch and display of Supabase data when the page loads
    fetchAndDisplaySupabaseData();


});
