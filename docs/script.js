
const bookingForm = document.getElementById("bookingForm");
const serviceSelect = document.getElementById("serviceType");

// Booking sections
const routeFields = document.getElementById("routeFields");
const lorryFields = document.getElementById("lorryFields");
const movingFields = document.getElementById("movingFields");
const insuranceFields = document.getElementById("insuranceFields");

// Show or hide a section
function toggleSection(section, show) {
    if (!section) {
        console.error("Missing HTML section!");
        return;
    }

    section.hidden = !show;
    section.style.display = show ? "grid" : "none";

    section.querySelectorAll("input, select").forEach(field => {
        field.required = show;
    });
}

// Service selection
function updateServiceFields() {

    const service = serviceSelect.value;

    console.log("Selected Service:", service);

    toggleSection(
        routeFields,
        service === "Lorry Booking" ||
        service === "Packers and Movers"
    );

    toggleSection(lorryFields, service === "Lorry Booking");

    toggleSection(movingFields, service === "Packers and Movers");

    toggleSection(insuranceFields, service === "Vehicle Insurance");
}

// Check HTML elements
if (!bookingForm || !serviceSelect) {
    console.error("Booking Form or Service Type ID missing!");
} else {

    serviceSelect.addEventListener("change", updateServiceFields);

    // Initial form state
    updateServiceFields();

    // Booking submission
    bookingForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (!bookingForm.reportValidity()) {
            return;
        }

        const name = document.getElementById("customerName").value.trim();
        const phone = document.getElementById("customerPhone").value.trim();
        const service = serviceSelect.value;
        const requirements = document.getElementById("requirements").value.trim();

        if (!/^[6-9][0-9]{9}$/.test(phone)) {
            alert("Enter a valid 10-digit mobile number.");
            return;
        }

        let message = `
S P TRANSPORT - NEW ENQUIRY

Customer Name: ${name}
Mobile: ${phone}
Service: ${service}
`;

        if (service === "Lorry Booking") {
            message += `
Pickup: ${document.getElementById("fromCity").value}
Delivery: ${document.getElementById("toCity").value}
Date: ${document.getElementById("bookingDate").value}
Vehicle: ${document.getElementById("vehicleType").value}
Material: ${document.getElementById("material").value}
Weight: ${document.getElementById("weight").value} Tons
`;
        }

        if (service === "Packers and Movers") {
            message += `
Pickup: ${document.getElementById("fromCity").value}
Delivery: ${document.getElementById("toCity").value}
Date: ${document.getElementById("bookingDate").value}
Shifting Type: ${document.getElementById("moveType").value}
`;
        }

        if (service === "Vehicle Insurance") {
            message += `
Vehicle Registration: ${document.getElementById("vehicleRegistration").value}
`;
        }

        message += `
Additional Requirements: ${requirements}
`;

        const whatsappURL =
            "https://wa.me/916379832919?text=" +
            encodeURIComponent(message);

        window.open(whatsappURL, "_blank");
    });
}
