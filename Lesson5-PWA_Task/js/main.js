window.addEventListener("DOMContentLoaded", function () {

    document.getElementById("find-me").addEventListener("click", geoFindMe);
    document.getElementById("shareBtn").addEventListener("click", share);

    let linkToShare = "";
    var text = "";

    function geoFindMe() {

        if ('geolocation' in navigator) {

           document.getElementById("status").innerHTML = "מאתר את מיקומך...";
            
            navigator.geolocation.getCurrentPosition((position) => {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const mapLink = document.querySelector('#map-link');

                mapLink.href = '';
                mapLink.textContent = '';
                mapLink.href = `https://maps.google.com/?q=${latitude},${longitude}`;

                mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

                linkToShare = `https://maps.google.com/?q=${latitude},${longitude}`;
                text = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
                
                document.getElementById("iframe").src = mapLink.href;
                document.getElementById("iframe").classList.remove("d-none");

            });

            /* geolocation is available */
        } else {

            document.getElementById("status").textContent = "No option to find location";
            /* geolocation IS NOT available */
        }


    }

    function share() {
        if (navigator.share)
        {
            const shareData = {
                title: "my Geo Location",
                text: text,
                url: linkToShare,
            }
            navigator.share(shareData);
        } else {
            document.getElementById("status").textContent="Share is not an option"
        }
    }
});