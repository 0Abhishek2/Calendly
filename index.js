const express = require('express');
const { google } = require('googleapis');

const app = express();
const port = 3000;

const SCOPES = 'https://www.googleapis.com/auth/calendar';
const GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDkwcjfTL8+sACr\nQ5yhHOiLCsteRh4qUSWrKTvZi1wDPN/x8EKK02EGrzqTUfuIf+5Jta9vFGtj3VMz\nFm060nkuAZGvOXkvPwQaJUY/wN957MUyDMffOD8W59jz8S0nlflZ8Z81NGD9h1jD\ncRvpoWtnRGwMvz8Hm5I7xhr1xpaX5posIbeESGRX3MD6noYfa3EXpv+CAjzbNZ12\nvS8XroSVTWJJK7UZXj7lVcBlWhO5SNph4g8eBtS+UsduL2hOdzms5rOO2S9fYLXj\nf7tWAilt0TnlGLoY5j3wqwXbLxBFqymmdIRH4pljhmqeIPsTvR5q2GatTmf39vkE\nmvcY1hGVAgMBAAECggEAN1mJIjiWbJNW8hmPsC8HuD7iIrsqCNiuGdpGBDbzSkhE\nMmzNGPyY1S54aJV1XFuB+11F58Vjz5vJigqy3sD297IC/0gTgaJIepAKzZm8KOro\nctoDUYgxQbhS9wFjyNiBpyjuugeksSt6x31agN7hFzFHyJTMqilTCnn+Y3oLzZBW\nFHaIx9wg44c6wMiOOxQS5SNQhA28yStC0c+R5opXCPw6TlzlAeMuq9G/6fMAaadP\nH0be98PqsKZLoSveZ8eHgVwP6TVj7OT5KBKVgpiZW8JWPadxxAyOCsHH4zW9W4cC\n0Vq6EmoEeiHY9o8qSHuG+FCnjBelfKA6Vj15jGxMsQKBgQD5N2CfqwvET9C21OyH\n9I80DDmH44SD3S8a/4l3uWBNliFARXgwQ3sCDJu56UT1jr09QXL7p7Q6VHrvHuUC\nXC4yBvEZ3hv8vHNO7gaUwB0Pmir8qiM4UESxiywY/euiDbPF+rQYdoJO/44uJuZg\nUjcTESHPTZlxar1IZ+RW49fnZQKBgQDq+9bzyNYAZY0mq2Ur1SvBnr0RJZ/sHSeH\nRXfTFf4VK3WVYd7FVqY/pL1346jya+KAJInjJyuanDJV+bYLoFCjHwSz6HBuRZ3Q\nt7wM3oRg8IH5w7hf9UGM7JeJ3X3MV5QZE1XIbg10CSFI7zm4GXFrzS5zbNhSP9oC\nQtnER0lWcQKBgESqPmQf06EmQKJvbjBTcLVtfNh1Fojig10T9UNYfzFBYS39Ng1O\nOnEpGisSG57w0jEzfEPcRCsiJbEGuSB6V3wPL5Tp/poXLkocCRIpEJjA6IEvO38D\nlrm4V9EW/TpsPhEZb0+iL2smvHz42NbHMEd/m+orPlDikP6HKYHLSyyFAoGATcFj\n0WtllOAFowQYCDcTsZALU/81OfYzvEk6azjdyLeGwxWNl5Mik/C5WVCV+RHF800j\n62xsu05wQY7NtG8p/7Al6DpD6dlTbVs++Ksw9rre53ziJ66KME2hn1cRZ2qbcOi6\n/AWeogTbZLz0Rnz00Q0mD7+2nRDP3OuuD4rfM6ECgYEApwLqMr3F9jOgVNFD6eL0\n34LjrTgfoRAZHBVcadJrTFPPTWDcmtUxmDqPLfd3ZTBzf8Gbgv7qmRopjYwMimbQ\nJUnHnP/Q0jHdu4ccfSwp8uLrBX7+grOwnxlTnXB9dKVv6lqXUqYMpQWWp1YjCUFJ\nuq4zkk+1kY/I7shPjQXRvks=\n-----END PRIVATE KEY-----\n"
const GOOGLE_CLIENT_EMAIL = "abhishek-808@numeric-anthem-340207.iam.gserviceaccount.com"
const GOOGLE_PROJECT_NUMBER = "175601123900"
const GOOGLE_CALENDAR_ID = "guptaanshu1050@gmail.com"

const event = {
  'summary': 'Testing Google Api',
  'location': 'Rasauli',
  'description': 'No need to join this meeting',
  'start': {
    'dateTime': '2023-04-09T18:30:00+05:30',
    'timeZone': 'Asia/Kolkata',
  },
  'end': {
    'dateTime': '2023-04-09T19:30:00+05:30',
    'timeZone': 'Asia/Kolkata',
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'attendees': [
    {'email': 'satiritik687@example.com'},
  ],
  'reminders': {
    'useDefault': true,
  },
};


app.get('/', (req, res) => {
  const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    SCOPES
  );

  const calendar = google.calendar({
    version: 'v3',
    project: GOOGLE_PROJECT_NUMBER,
    auth: jwtClient
  });

calendar.events.insert({
  calendarId: GOOGLE_CALENDAR_ID,
  resource: event,
}, function(err, event) {
  if (err) {
    console.log('There was an error contacting the Calendar service: ' + err);
    return;
  }
  console.log('Event created: %s', event.htmlLink);
});

  calendar.events.list({
    calendarId: GOOGLE_CALENDAR_ID,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (error, result) => {
    if (error) {
      res.send(JSON.stringify({ error: error }));
    } else {
      if (result.data.items.length) {
        res.send(JSON.stringify({ events: result.data.items }));
      } else {
        res.send(JSON.stringify({ message: 'No upcoming events found.' }));
      }
    }
  });
});

app.listen(port, () => console.log("Example app listening on port ${port}!"));