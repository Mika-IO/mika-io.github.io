function displayTime() {
    var date = new Date(); // Get current date and time
    var hours = date.getHours(); // Get only the hours
    var minutes = date.getMinutes(); // Get only the minutes
    var seconds = date.getSeconds(); // Get only the seconds

    // Format hours, minutes, and seconds to always have two digits
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Display the current time on the page
    document.getElementById("current-time").textContent = hours + ":" + minutes + ":" + seconds;

    // Update every second
    setTimeout(displayTime, 1000);
}