$(document).ready(function(){
      $("#newEventTitle").on('click',function(){ 
        $("#eventForm").slideToggle(700);
        $('html,body').animate({scrollTop: $("#eventForm").offset().top}, 700);});
  		$(".summary").each(function(){
        $(this).click(function(){
          $(this).next().slideToggle(300);});});
      $(".datepicker").each(function(){
        $(this).datepicker({
          showOtherMonths: true,
          selectOtherMonths: true,
          showButtonPanel: true,
          changeMonth: true,
          changeYear: true,
          showOn: "button",
          buttonImage: "images/calendar.gif",
          buttonImageOnly: true,
          defaultDate: +0,
          dateFormat: "yy-mm-dd"
    })});
    $("#fullDay").on('change',function(){
      if($(this).is(':checked')){
        $(".time").each(function(){$(this).attr("disabled","disabled").removeAttr("required");});
        $("#endDate").val($("#startDate").val());
      }
      else
         $(".time").each(function(){$(this).removeAttr("disabled").attr("required","required");});
    });
    $("#recurrence").on('change',function(){
         $("#recurrenceForm").slideToggle(700);
         $('html,body').animate({scrollTop: $("#eventForm").offset().top}, 700);
    });
  });

function deleteEvent(event)
{
    var confirmation = confirm("Θέλετε να διαγράψετε αυτό το event;");
    if(confirmation == true)
    {
    	var eventID = $(event).attr("eid");
    	window.location.href = "calendar?action=delete&eid=" + eventID;
    }
}


