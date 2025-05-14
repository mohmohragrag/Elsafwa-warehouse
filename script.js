function createFields(type, prefix) {
    if (type === "builtup") {
        return `
            <fieldset>
                <legend>أبعاد ${prefix === "rafter" ? "الرافتـر" : "العمود"} (Built-Up)</legend>
                <label>bf: <input type="number" id="${prefix}_bf" required></label>
                <label>tf: <input type="number" id="${prefix}_tf" required></label>
                <label>tw: <input type="number" id="${prefix}_tw" required></label>
                <label>hw: <input type="number" id="${prefix}_hw" required></label>
            </fieldset>
        `;
    } else if (type === "box") {
        return `
            <fieldset>
                <legend>أبعاد ${prefix === "rafter" ? "الرافتـر" : "العمود"} (علبة)</legend>
                <label>الطول: <input type="number" id="${prefix}_length" required></label>
                <label>العرض: <input type="number" id="${prefix}_width" required></label>
                <label>السمك: <input type="number" id="${prefix}_thickness" required></label>
            </fieldset>
        `;
    } else if (type === "pipe") {
        return `
            <fieldset>
                <legend>أبعاد ${prefix === "rafter" ? "الرافتـر" : "العمود"} (ماسورة)</legend>
                <label>القطر الخارجي: <input type="number" id="${prefix}_diameter" required></label>
                <label>السمك: <input type="number" id="${prefix}_thickness" required></label>
            </fieldset>
        `;
    }
    return '';
}

function updateSection(id, type, prefix) {
    document.getElementById(id).innerHTML = createFields(type, prefix);
}

document.getElementById("rafter_type").addEventListener("change", function () {
    updateSection("rafter_fields", this.value, "rafter");
});
document.getElementById("column_type").addEventListener("change", function () {
    updateSection("column_fields", this.value, "column");
});
document.getElementById("has_middle_column").addEventListener("change", function () {
    const field = document.getElementById("middle_column_fields");
    if (this.value === "yes") {
        field.style.display = "block";
        field.innerHTML = createFields("builtup", "middle");
    } else {
        field.style.display = "none";
        field.innerHTML = "";
    }
});

// مبدئيًا اظهار الحقول
updateSection("rafter_fields", "builtup", "rafter");
updateSection("column_fields", "builtup", "column");

// ملحوظة: عمليات الحساب لم تُدرج هنا بعد حسب الأنواع المختلفة، إذا أردت إضافة الكود الكامل للحسابات سأكمله لك بناءً على جميع الأنواع
