$(document).ready(function() {
    $("#newEventTitle").on('click', function() {
	$("#eventForm").slideToggle(700);
	$('html,body').animate({scrollTop: $("#eventForm").offset().top}, 700);
    });
    $("#subscribeTitle").on('click', function() {
	$("#subscribeForm").slideToggle(700);
	$('html,body').animate({scrollTop: $("#eventForm").offset().top}, 700);
    });
    $(".summary").each(function() {
	$(this).click(function() {
	    $(this).children().children(".details").slideToggle(300);
	});
    });
    $(".datepicker").each(function() {
	$(this).datepicker({
	    showOtherMonths: true,
	    selectOtherMonths: true,
	    showButtonPanel: true,
	    changeMonth: true,
	    changeYear: true,
	    showOn: "button",
	    buttonImage: "sites/all/modules/calendar/images/calendar.gif",
	    buttonImageOnly: true,
	    defaultDate: null,
	    minDate: '-0d',
	    dateFormat: "yy-mm-dd"
	})
    });
    $("#fullDay").on('change', function() {
	if ($(this).is(':checked')) {
	    $(".time").each(function() {
		$(this).attr("disabled", "disabled").removeAttr("required");
	    });
	    $("#endDate").val($("#startDate").val());
	}
	else
	    $(".time").each(function() {
		$(this).removeAttr("disabled").attr("required", "required");
	    });
    });
    $("#recurrence").on('change', function() {
	if ($(this).is(':checked')) {
	    $("#recurrenceForm").slideDown(700);
	}
	else {
	    $("#recurrenceForm").slideUp(700);
	}
	$('html,body').animate({scrollTop: $("#eventForm").offset().top}, 700);
    });
    $('#frequencySelector').on('change', function()
    {
	var frequency = $(this).val();
	if (frequency == 'DAILY')
	{
	    $('#repeat td:last-child').html('<input name="repeat" type="number" min="1" max="29" step="1"  value="6"> μέρες');
	    $('#days').remove();
	}
	else if (frequency == 'WEEKLY')
	{
	    $('#repeat td:last-child').html('<input name="repeat" type="number" min="1" max="29" step="1"  value="6"> εβδομάδες');
	    if ($('#days').length == 0)
	    {
		$("<tr id='days'></tr>").insertAfter($('#repeat'));
	    }
	    $('#days').html("<td>Επανάληψη την:</td><td><input name='days[]' type='checkbox' value='MO'>Δ<input name='days[]' type='checkbox' value='TU'>Τ<input name='days[]' type='checkbox' value='WE'>Τ<input name='days[]' type='checkbox' value='TH'>Π<input name='days[]' type='checkbox' value='FR'>Π<input name='days[]' type='checkbox' value='SA'>Σ<input name='days[]' type='checkbox' value='SU'>Κ</td>");
	}
	else
	{
	    $('#repeat td:last-child').html('<input name="repeat" type="number" min="1" max="29" step="1"  value="6"> μήνες');
	    if ($('#days').length == 0)
	    {
		$("<tr id='days'></tr>").insertAfter($('#repeat'));
	    }
	    $('#days').html("<td>Επανάληψη την:</td><td><input type='radio' name='days' value='monthday' checked/> ημέρα του μήνα<input type='radio' name='days' value='weekday'/> ημέρα της εβδομάδας</td>");
	}
    });
    $('input[name="expiration"]').on('change', function() {
	var state = $(this).val();
	if (state == 'after') {
	    $('input[name="occurrences"]').removeAttr("disabled");
	    $('input[name="occurrences"]').val("1");
	    $('input[name="recurrenceEnd"]').attr("disabled", "disabled");
	}
	else if (state == 'until') {
	    $('input[name="recurrenceEnd"]').removeAttr("disabled");
	    $('input[name="occurrences"]').attr("disabled", "disabled");
	    $('input[name="recurrenceEnd"]')
	}
	else {
	    $('input[name="recurrenceEnd"]').attr("disabled", "disabled");
	    $('input[name="occurrences"]').attr("disabled", "disabled");
	}
    });
});

function deleteEvent(event)
{
    var confirmation = confirm("Θέλετε να διαγράψετε αυτό το event;");
    if (confirmation == true)
    {
	var eventID = $(event).attr("eid");
	window.location.href = "calendar?action=delete&eid=" + eventID;
    }
}

