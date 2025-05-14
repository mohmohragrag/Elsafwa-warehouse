// دالة لإنشاء الحقول الخاصة بأنواع المقاطع
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

// دالة لتحديث الحقول حسب نوع المقطع الذي اختاره المستخدم
function updateSection(id, type, prefix) {
    document.getElementById(id).innerHTML = createFields(type, prefix);
}

// دالة لحساب قوة العمود أو الرافتـر بناءً على الأبعاد المدخلة
function calculateStrength(type, prefix) {
    let strength = 0;
    if (type === "builtup") {
        const bf = parseFloat(document.getElementById(`${prefix}_bf`).value);
        const tf = parseFloat(document.getElementById(`${prefix}_tf`).value);
        const tw = parseFloat(document.getElementById(`${prefix}_tw`).value);
        const hw = parseFloat(document.getElementById(`${prefix}_hw`).value);

        // مثال بسيط على الحسابات
        strength = bf * tf * hw * 0.5; // هذا مجرد مثال افتراضي
    } else if (type === "box") {
        const length = parseFloat(document.getElementById(`${prefix}_length`).value);
        const width = parseFloat(document.getElementById(`${prefix}_width`).value);
        const thickness = parseFloat(document.getElementById(`${prefix}_thickness`).value);

        // حساب قوة علبة
        strength = length * width * thickness * 0.4; // هذا مجرد مثال افتراضي
    } else if (type === "pipe") {
        const diameter = parseFloat(document.getElementById(`${prefix}_diameter`).value);
        const thickness = parseFloat(document.getElementById(`${prefix}_thickness`).value);

        // حساب قوة ماسورة
        strength = Math.PI * Math.pow(diameter, 2) * thickness * 0.3; // هذا مجرد مثال افتراضي
    }
    return strength;
}

// تحديث الحقول عند تغيير نوع مقطع الرافتـر
document.getElementById("rafter_type").addEventListener("change", function () {
    updateSection("rafter_fields", this.value, "rafter");
});

// تحديث الحقول عند تغيير نوع مقطع العمود
document.getElementById("column_type").addEventListener("change", function () {
    updateSection("column_fields", this.value, "column");
});

// إظهار أو إخفاء الحقول الخاصة بالعمود الأوسط
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

// مبدئيًا، نعرض الحقول الخاصة بالمقاطع Built-Up
updateSection("rafter_fields", "builtup", "rafter");
updateSection("column_fields", "builtup", "column");

// دالة لتقديم النتيجة عند الضغط على زر التحليل
document.getElementById("frameForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const rafterType = document.getElementById("rafter_type").value;
    const columnType = document.getElementById("column_type").value;
    const middleColumn = document.getElementById("has_middle_column").value;

    // حساب قوة العمود والرفتر
    const rafterStrength = calculateStrength(rafterType, "rafter");
    const columnStrength = calculateStrength(columnType, "column");

    let middleStrength = 0;
    if (middleColumn === "yes") {
        middleStrength = calculateStrength("builtup", "middle");
    }

    const totalStrength = rafterStrength + columnStrength + middleStrength;

    // تحديد ما إذا كان الإطار آمنًا أم لا
    const safetyMargin = 0.8; // هذا هو الحد الأدنى المسموح به للأمان
    const isSafe = totalStrength >= safetyMargin;

    // عرض النتائج
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <h2>النتائج:</h2>
        <p>قوة الرافتـر: ${rafterStrength} وحدة</p>
        <p>قوة العمود: ${columnStrength} وحدة</p>
        ${middleColumn === "yes" ? `<p>قوة العمود الأوسط: ${middleStrength} وحدة</p>` : ''}
        <p><strong>القوة الإجمالية: ${totalStrength} وحدة</strong></p>
        <p><strong style="color: ${isSafe ? 'green' : 'red'};">الإطار ${isSafe ? 'آمن' : 'غير آمن'}</strong></p>
    `;
});
