document.getElementById('frameForm').addEventListener('submit', function (event) {
  event.preventDefault();
  
  // جمع البيانات من الحقول
  const r1Type = document.getElementById('rafter_type_r1').value;
  const r2Type = document.getElementById('rafter_type_r2').value;
  const c1Type = document.getElementById('column_type_c1').value;
  const c2Type = document.getElementById('column_type_c2').value;

  const H = parseFloat(document.getElementById('H').value);
  const H_total = parseFloat(document.getElementById('H_total').value);
  const span = parseFloat(document.getElementById('span').value);
  const spacing = parseFloat(document.getElementById('spacing').value);
  const loadArea = parseFloat(document.getElementById('load_area').value);
  const fy = parseFloat(document.getElementById('fy').value);
  const FS = parseFloat(document.getElementById('FS').value);
  const K = parseFloat(document.getElementById('K').value);

  // جمع القيم الميكانيكية بناءً على نوع المقطع
  let r1Dimensions = getRafterDimensions(r1Type, 'r1');
  let r2Dimensions = getRafterDimensions(r2Type, 'r2');
  let c1Dimensions = getColumnDimensions(c1Type, 'c1');
  let c2Dimensions = getColumnDimensions(c2Type, 'c2');
  
  // حسابات الأمان (يمكنك إضافة المزيد من الحسابات الميكانيكية هنا)
  let result = calculateSafety(r1Dimensions, r2Dimensions, c1Dimensions, c2Dimensions, H, span, loadArea, FS, K, fy);
  
  // عرض النتائج
  displayResults(result);
});

// دالة لجمع أبعاد الرافتـر بناءً على نوع المقطع
function getRafterDimensions(type, rafter) {
  if (type === 'builtup') {
    return {
      bf: parseFloat(document.getElementById(`bf_${rafter}`).value),
      tf: parseFloat(document.getElementById(`tf_${rafter}`).value),
      tw: parseFloat(document.getElementById(`tw_${rafter}`).value),
      hw: parseFloat(document.getElementById(`hw_${rafter}`).value)
    };
  } else if (type === 'box') {
    return {
      length: parseFloat(document.getElementById(`length_${rafter}`).value),
      width: parseFloat(document.getElementById(`width_${rafter}`).value),
      thickness: parseFloat(document.getElementById(`thickness_${rafter}`).value)
    };
  } else if (type === 'pipe') {
    return {
      diameter: parseFloat(document.getElementById(`diameter_${rafter}`).value),
      thickness: parseFloat(document.getElementById(`thickness_${rafter}`).value)
    };
  }
}

// دالة لجمع أبعاد العمود بناءً على نوع المقطع
function getColumnDimensions(type, column) {
  if (type === 'builtup') {
    return {
      bf: parseFloat(document.getElementById(`bf_${column}`).value),
      tf: parseFloat(document.getElementById(`tf_${column}`).value),
      tw: parseFloat(document.getElementById(`tw_${column}`).value),
      hw: parseFloat(document.getElementById(`hw_${column}`).value)
    };
  } else if (type === 'box') {
    return {
      length: parseFloat(document.getElementById(`length_${column}`).value),
      width: parseFloat(document.getElementById(`width_${column}`).value),
      thickness: parseFloat(document.getElementById(`thickness_${column}`).value)
    };
  } else if (type === 'pipe') {
    return {
      diameter: parseFloat(document.getElementById(`diameter_${column}`).value),
      thickness: parseFloat(document.getElementById(`thickness_${column}`).value)
    };
  }
}

// دالة لحساب أمان الإطار
function calculateSafety(r1, r2, c1, c2, H, span, loadArea, FS, K, fy) {
  // قم بإضافة معادلات حساب الأمان الميكانيكي هنا
  // هذا مجرد مثال بسيط للحسابات
  let safetyFactor = 0;  // حساب عامل الأمان بناءً على المدخلات
  let safetyStatus = "آمن";  // افتراضي

  // استخدم المعادلات المناسبة هنا
  safetyFactor = (fy * H_total) / (span * loadArea);

  if (safetyFactor < FS) {
    safetyStatus = "غير آمن";
  }

  return {
    safetyFactor: safetyFactor,
    status: safetyStatus
  };
}

// دالة لعرض النتائج
function displayResults(result) {
  let resultsDiv = document.getElementById('results');
  resultsDiv.style.display = 'block';
  resultsDiv.innerHTML = `
    <h2>نتائج التحليل</h2>
    <p><strong>عامل الأمان: </strong> ${result.safetyFactor}</p>
    <p><strong>حالة الإطار: </strong> ${result.status}</p>
  `;
}

// دالة لعرض الحقول المناسبة بناءً على الاختيارات
document.getElementById('rafter_type_r1').addEventListener('change', function() {
  toggleRafterFields('r1');
});

document.getElementById('rafter_type_r2').addEventListener('change', function() {
  toggleRafterFields('r2');
});

document.getElementById('column_type_c1').addEventListener('change', function() {
  toggleColumnFields('c1');
});

document.getElementById('column_type_c2').addEventListener('change', function() {
  toggleColumnFields('c2');
});

function toggleRafterFields(rafter) {
  let type = document.getElementById(`rafter_type_${rafter}`).value;

  // إخفاء جميع الحقول
  document.getElementById(`rafter_${rafter}_builtup_fields`).style.display = 'none';
  document.getElementById(`rafter_${rafter}_box_fields`).style.display = 'none';
  document.getElementById(`rafter_${rafter}_pipe_fields`).style.display = 'none';

  if (type === 'builtup') {
    document.getElementById(`rafter_${rafter}_builtup_fields`).style.display = 'block';
  } else if (type === 'box') {
    document.getElementById(`rafter_${rafter}_box_fields`).style.display = 'block';
  } else if (type === 'pipe') {
    document.getElementById(`rafter_${rafter}_pipe_fields`).style.display = 'block';
  }
}

function toggleColumnFields(column) {
  let type = document.getElementById(`column_type_${column}`).value;

  // إخفاء جميع الحقول
  document.getElementById(`column_${column}_builtup_fields`).style.display = 'none';
  document.getElementById(`column_${column}_box_fields`).style.display = 'none';
  document.getElementById(`column_${column}_pipe_fields`).style.display = 'none';

  if (type === 'builtup') {
    document.getElementById(`column_${column}_builtup_fields`).style.display = 'block';
  } else if (type === 'box') {
    document.getElementById(`column_${column}_box_fields`).style.display = 'block';
  } else if (type === 'pipe') {
    document.getElementById(`column_${column}_pipe_fields`).style.display = 'block';
  }
}

