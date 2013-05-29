$(document).ready(function(){
  		$(".summary").each(function(){$(this).click(function(){$(this).next().slideToggle(300);});
  		});
      $(".datepicker").each(function(){$(this).datepicker({
      showOtherMonths: true,
      selectOtherMonths: true,
      showButtonPanel: true,
      changeMonth: true,
      changeYear: true,
      showOn: "button",
      buttonImage: "images/calendar.gif",
      buttonImageOnly: true,
      dateFormat: "yy-mm-dd"
    });
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

function slideForm()
{
  $("#eventForm").slideToggle(300);
}