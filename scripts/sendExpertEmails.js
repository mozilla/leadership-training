/* Send Form by Email */

function Initialize() {

  var triggers = ScriptApp.getProjectTriggers();

  for(var i in triggers) {
    ScriptApp.deleteTrigger(triggers[i]);
  }

  ScriptApp.newTrigger("SendGoogleForm")
  .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
  .onFormSubmit()
  .create();

}


function SendGoogleForm(e)
{
  try
  {
    // You may also replace this with another email address
    var email = "abby@mozillafoundation.org"; //Session.getActiveUser().getEmail();


    var s = SpreadsheetApp.getActiveSheet();
    var headers = s.getRange(1,1,1,s.getLastColumn()).getValues()[0];

    var requestor = e.namedValues['Email Address'].toString();
    var name = e.namedValues['Your name'].toString();
    var expert = e.namedValues['Which mentor would you like to contact?'].toString();
    var mentee = e.namedValues['Mentee name(s)'].toString();
    var time =  e.namedValues['What time and day is your regular mentorship meeting?'].toString();
    var help =  e.namedValues['Who is the mentee and project? What kind of help are they looking for?'].toString();
    var anything =  e.namedValues['Anything else we should know?'].toString();
    var row = e.range.getRow();

    var getExpertEmail = {
        "Akshay Roongta": "abby+Akshay@mozillafoundation.org",
        "Achintya Rao": "abby+Achintya@mozillafoundation.org",
        "Adam Getchell": "abby+Adam@mozillafoundation.org",
        "Alissa Nedossekina": "abby+Alissa@mozillafoundation.org",
        "Alexander M Wafula": "abby+Alexander@mozillafoundation.org",
        "Amel Ghouila": "abby+Amel@mozillafoundation.org",
        "Ana Raquel Oliveira Martins": "abby+Ana@mozillafoundation.org",
        "Amie Fairs": "abby+Amie@mozillafoundation.org",
        "Anna Krystalli": "abby+Anna@mozillafoundation.org",
        "Andrew Nelson": "abby+Andrew@mozillafoundation.org",
        "Baratang Miya": "abby+Baratang@mozillafoundation.org",
        "Anubha Maneshwar": "abby+Anubha@mozillafoundation.org",
        "April Clyburne-Sherin": "abby+April@mozillafoundation.org",
        "Bastian Greshake Tzovaras": "abby+Bastian@mozillafoundation.org",
        "Chris Hartgerink": "abby+Chris@mozillafoundation.org",
        "Bonface Ochieng Okello": "abby+Bonface@mozillafoundation.org",
        "Brian Bot": "abby+Brian@mozillafoundation.org",
        "Camille Maumet": "abby+Camille@mozillafoundation.org",
        "Chris Otta": "abby+Chris@mozillafoundation.org",
        "Chris Ritzo": "abby+Chris@mozillafoundation.org",
        "Daniela Saderi": "abby+Daniela@mozillafoundation.org",
        "Danielle Robinson": "abby+Danielle@mozillafoundation.org",
        "Dano Morrison": "abby+Dano@mozillafoundation.org",
        "David Bild": "abby+David@mozillafoundation.org",
        "David Ross": "abby+David@mozillafoundation.org",
        "Drashti Pandya": "abby+Drashti@mozillafoundation.org",
        "Dellicia Shorter": "abby+Dellicia@mozillafoundation.org",
        "Demitri Muna": "abby+Demitri@mozillafoundation.org",
        "Denise Linn": "abby+Denise@mozillafoundation.org",
        "Edoardo Viola": "abby+Edoardo@mozillafoundation.org",
        "Fredrick Sigalla": "abby+Fredrick@mozillafoundation.org",
        "Grant R Vousden-Dishington": "abby+Grant@mozillafoundation.org",
        "Harry Smith": "abby+Harry@mozillafoundation.org",
        "Hannah Kane": "abby+Hannah@mozillafoundation.org",
        "Hao Ye": "abby+Hao@mozillafoundation.org",
        "Ipsha Bhidonia": "abby+Ipsha@mozillafoundation.org",
        "Heather Lent": "abby+Heather@mozillafoundation.org",
        "Julian Pistorius": "abby+Julian@mozillafoundation.org",
        "Jason A. Clark": "abby+Jason@mozillafoundation.org",
        "Jason A. Clark": "abby+Jason@mozillafoundation.org",
        "Jesse von Doom": "abby+Jesse@mozillafoundation.org",
        "Jon Tennant": "abby+Jon@mozillafoundation.org",
        "Julia Vallera": "abby+Julia@mozillafoundation.org",
        "Kade Morton": "abby+Kade@mozillafoundation.org",
        "Kelly Clancy": "abby+Kelly@mozillafoundation.org",
        "Katie Hendrix": "abby+Katie@mozillafoundation.org",
        "Kirstie Whitaker": "abby+Kirstie@mozillafoundation.org",
        "Kristyn Sonnenberg": "abby+Kristyn@mozillafoundation.org",
        "Kshitiz Khanal": "abby+Kshitiz@mozillafoundation.org",
        "Kumaresan.C.S": "abby+Kumaresan@mozillafoundation.org",
        "Madeleine Bonsma-Fisher": "abby+Madeleine@mozillafoundation.org",
        "Lisa Wright": "abby+Lisa@mozillafoundation.org",
        "Liza Durón": "abby+Liza@mozillafoundation.org",
        "Lucy Patterson": "abby+Lucy@mozillafoundation.org",
        "Lukas Geiger": "abby+Lukas@mozillafoundation.org",
        "Marcos Vinícius Carneiro Vital": "abby+Marcos@mozillafoundation.org",
        "Maryann Wangari": "abby+Maryann@mozillafoundation.org",
        "Minn Soe": "abby+Minn@mozillafoundation.org",
        "Matthew Willse": "abby+Matthew@mozillafoundation.org",
        "Max Franz": "abby+Max@mozillafoundation.org",
        "Mmaki Jantjies": "abby+Mmaki@mozillafoundation.org",
        "Monica Granados": "abby+Monica@mozillafoundation.org",
        "Peter Grabitz": "abby+Peter@mozillafoundation.org",
        "Nikesh Balami": "abby+Nikesh@mozillafoundation.org",
        "Oliver Sauter": "abby+Oliver@mozillafoundation.org",
        "Paul Villoutreix": "abby+Paul@mozillafoundation.org",
        "Peter Omondi Ochieng": "abby+Peter@mozillafoundation.org",
        "Philipp Bayer": "abby+Philipp@mozillafoundation.org",
        "Priyanka Nag": "abby+Priyanka@mozillafoundation.org",
        "Riccardo Iaconelli": "abby+Riccardo@mozillafoundation.org",
        "Sara Todaro": "abby+Sara@mozillafoundation.org",
        "Robert Sullivan": "abby+Robert@mozillafoundation.org",
        "Semirah Dolan": "abby+Semirah@mozillafoundation.org",
        "Shreyas Narayanan Kutty": "abby+Shreyas@mozillafoundation.org",
        "Sharada Prasanna Mohanty": "abby+Sharada@mozillafoundation.org",
        "Siddharth Prakash Rao": "abby+Siddharth@mozillafoundation.org",
        "Sydney Swaine-Simon": "abby+Sydney@mozillafoundation.org",
        "Tim Head": "abby+Tim@mozillafoundation.org",
        "Taís de Souza Lessa": "abby+Taís@mozillafoundation.org",
        "Tom Hohenstein": "abby+Tom@mozillafoundation.org",
        "Winnie R Makokha": "abby+Winnie@mozillafoundation.org",
        "Zannah Marsh": "abby+Zannah@mozillafoundation.org"
    };
    var expertEmail = getExpertEmail[expert];


    var subject = "Mentor meeting request! Mozilla Open Leaders";
    var message = "Hello " + expert + "!";
    message += "<p>You've been requested to join a mentorship meeting with Mozilla Open Leaders.</p>";
    message += "<p>" + name + " (cc'ed), is currently mentoring " + mentee + " and has requested you join one of their regular mentorship meetings. " + name + " has provided the following info:</p>";
    message += "<p>//////</p>";
    message += "<p><b>Who is the mentee and project? What kind of help are they looking for?</b><br />" + help + "</p>";
    message += "<p><b>What time and day is your regular mentorship meeting?</b><br />" + time + "</p>";
    message += "<p><b>Anything else we should know?</b><br />" + anything + "</p>";
    message += "<p>//////</p>";
    message += "<p>Are you interested in meeting with this project? If so, can you make it to one of their regular mentorship meeting times? <b>Please reply-all to this email</b> to let us know if you can jump on a call & coordinate a way to chat :)</p>";
    message += "<p>Thanks in advance,<br />Abby</p><br /><br />";
    message += "<p>---</p>";
    message += "<p>Thank you for sharing your expertise and knowledge with our network! If you'd rather not receive these requests, let me know and I'll remove you from the mentor list.</p>";


    // This is the MailApp service of Google Apps Script
    // that sends the email. You can also use GmailApp here.

    MailApp.sendEmail({
     to: expertEmail,
     subject: subject,
     htmlBody: message,
     cc: requestor
    });


  } catch (e) {
    Logger.log(e.toString());
          MailApp.sendEmail('abby@mozillafoundation.org',
                    'error in OL4 expert request form',
                    e);
  }

}


function formatGitHubId(id) {
  if(!id){ return; }
  var ids = id.split("/");
  while(!(id = ids.pop())){}
  ids = id.split("@");
  while(!(id = ids.pop())){}
  return "@" + id;
}

