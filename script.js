function dayClick(e) {
    let wrapper = e.closest(`.datetimepicker-wrapper`);
    let curDate = new Date(
        parseInt(e.dataset.year),
        parseInt(e.dataset.month),
        parseInt(e.innerHTML),
        0,
        0,
        0,
        0
    );
    wrapper.parentNode.selectCB(curDate);
    wrapper.remove();
}

function generateDateTableBody(month, year) {
    let result = '';
    let counter = 0;
    let curDate = new Date(year, month, 1, 0, 0, 0, 0);
    let startDatOffset = curDate.getDay() * -1 + 2;

    for (let week = 0; week < 6; week++) {
        result += '<tr>';

        for (let day = 0; day < 7; day++) {
            let d = new Date(year, month, counter + startDatOffset, 0, 0, 0, 0);
            if (d.getMonth() == month)
                result += `<td class="datetimepicker-curmonth" data-month="${d.getMonth()}" data-year="${d.getFullYear()}" onclick="dayClick(this)">${d.getDate()}</td>`;
            else
                result += `<td class="datetimepicker-not-curmonth" data-month="${d.getMonth()}" data-year="${d.getFullYear()}" onclick="dayClick(this)">${d.getDate()}</td>`;

            counter++;
        }

        result += '</tr>';
    }

    return result;
}

function datePickerMonthChange(e) {
    let month = e.options[e.selectedIndex].value;
    let wrapper = e.closest(`.datetimepicker-wrapper`);
    let tableBody = wrapper.getElementsByClassName(
        'datetimepicker-datetablebody'
    )[0];
    let yearSelector = wrapper.getElementsByClassName('datetimepicker-year')[0];
    tableBody.innerHTML = generateDateTableBody(
        parseInt(month),
        parseInt(yearSelector.value)
    );
}

function datePickerYearChange(e) {
    let year = parseInt(e.value);
    let wrapper = e.closest(`.datetimepicker-wrapper`);
    let tableBody = wrapper.getElementsByClassName(
        'datetimepicker-datetablebody'
    )[0];
    let monthSelector = wrapper.getElementsByClassName(
        'datetimepicker-month'
    )[0];
    tableBody.innerHTML = generateDateTableBody(
        parseInt(monthSelector.options[monthSelector.selectedIndex].value),
        year
    );
}

function closeDatePicker(e) {
    e.closest(`.datetimepicker-wrapper`).remove();
}

function generateCalendar(month, year) {
    let result = '';
    let curTime = new Date();
    let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    result += '<div class="datetimepicker-wrapper">';
    result += '<div class="datetimepicker-header">';
    result += '<h1 class="datetimepicker-title">Select date</h1>';
    result +=
        '<h1 class="datetimepicker-header-close" onclick="closeDatePicker(this)">X</h1>';
    result += '</div>';
    result += '<div class="datetimepicker-body">';
    result += '<div class="row">';
    result += '<div class="col">';
    result +=
        '<select class="form-control datetimepicker-month" onchange="datePickerMonthChange(this)">';

    for (let index in months)
        if (index == month)
            result += `<option value="${index}" selected>${months[index]}</option>`;
        else result += `<option value="${index}">${months[index]}</option>`;

    result += '</select>';
    result += '</div>';
    result += '<div class="col">';
    result +=
        '<input type="number" class="form-control datetimepicker-year" value="' +
        year +
        '" onchange="datePickerYearChange(this)"/>';
    result += '</div>';
    result += '</div>';
    result += '<div class="row"><div class="col-sm-12">';
    result +=
        '<table class="table"><tbody class="datetimepicker-datetablebody">' +
        generateDateTableBody(month, year) +
        '</tbody></table>';
    result += '</div></div>';
    result += '</div>';
    result += '</div>';
    result += '';

    return result;
}

function datePicker(wrapper, cb, startDate = null) {
    let curDate = new Date();

    if (startDate !== null) curDate = new Date(startDate);

    wrapper.innerHTML = generateCalendar(
        curDate.getMonth(),
        curDate.getFullYear()
    );
    wrapper.selectCB = cb;
}

function calendarCB(date) {
    document.getElementById('dateInput').value = date;
}

function showCalend() {
    datePicker(document.getElementById('datePickerWrapper'), calendarCB);
}
