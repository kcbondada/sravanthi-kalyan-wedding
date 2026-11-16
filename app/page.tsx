"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Language = "en" | "te";
type Team = "groom" | "bride";

const copy = {
  en: {
    choose: "Choose your language",
    enter: "Enter the celebration",
    blessing: "With the blessings of our families",
    invitation: "We warmly invite you to join us as we begin our journey into a lifetime of togetherness. Your presence and blessings will make our celebrations complete.",
    groomParents: "Son of Bondada Ramalingeswara Rao & Bondada Nageswaramma",
    brideParents: "Daughter of Sanaka Venu Gopala Rao & Sarala",
    celebration: "The Celebrations",
    eventIntro: "Five cherished moments. One beautiful beginning.",
    dressCode: "Dress Code",
    dressIntro: "Dress up and match our celebration vibe!",
    live: "Live Broadcast",
    liveIntro: "Unable to join us in person? Watch online and bless the couple.",
    watchLive: "Watch Live",
    coming: "Details coming soon",
    countdown: "Next: Haldi · November 21, 2026 · Afternoon",
    at: "at",
    map: "Open in Maps",
    youtube: "Watch on YouTube",
    calendar: "Calendar available after exact time is confirmed",
    contact: "Point of contact",
    story: "Our Story",
    storyText: "A simple hello became a friendship, a friendship found its forever, and now our families come together to celebrate the next chapter.",
    gallery: "Memories in the making",
    galleryText: "A few beautiful moments from our journey, captured with love.",
    rsvp: "Will you join us?",
    name: "Your name",
    attending: "Joyfully attending",
    notAttending: "Unable to attend",
    submit: "Send RSVP",
    submitting: "Sending RSVP…",
    thanks: "Thank you! Your RSVP has been sent successfully.",
    submitError: "We could not send your RSVP. Please check your connection and try again.",
    editResponse: "Edit response",
    closing: "With love, the Bondada & Sanaka families",
    language: "తెలుగు",
    nav: ["Home", "Invitation", "Events", "Dress Code", "Live", "Story", "RSVP"]
  },
  te: {
    choose: "మీ భాషను ఎంచుకోండి",
    enter: "వేడుకలోకి ప్రవేశించండి",
    blessing: "మా కుటుంబ సభ్యుల ఆశీస్సులతో",
    invitation: "మేము ప్రారంభించబోయే నూతన జీవిత ప్రయాణానికి మిమ్మల్ని సాదరంగా ఆహ్వానిస్తున్నాము. మీ రాక, ఆశీస్సులు మా వేడుకలను మరింత సంపూర్ణం చేస్తాయి.",
    groomParents: "బొండాడ రామలింగేశ్వరరావు & బొండాడ నాగేశ్వరమ్మ గార్ల కుమారుడు",
    brideParents: "సనక వేణు గోపాల రావు & సరళ గార్ల కుమార్తె",
    celebration: "శుభ వేడుకలు",
    eventIntro: "ఐదు మధురమైన ఘట్టాలు. ఒక అందమైన ఆరంభం.",
    dressCode: "వస్త్రధారణ",
    dressIntro: "మా వేడుకల సందడికి తగ్గట్టుగా అందంగా ముస్తాబై రండి!",
    live: "ప్రత్యక్ష ప్రసారం",
    liveIntro: "రాలేకపోతున్నారా? ఆన్‌లైన్‌లో వీక్షించి వధూవరులను ఆశీర్వదించండి.",
    watchLive: "ప్రత్యక్షంగా చూడండి",
    coming: "వివరాలు త్వరలో",
    countdown: "తదుపరి వేడుక: హల్దీ · నవంబర్ 21, 2026 · మధ్యాహ్నం",
    at: "వేదిక",
    map: "మ్యాప్స్‌లో చూడండి",
    youtube: "యూట్యూబ్‌లో చూడండి",
    calendar: "ఖచ్చితమైన సమయం నిర్ధారించిన తర్వాత క్యాలెండర్ అందుబాటులో ఉంటుంది",
    contact: "సంప్రదించవలసిన వ్యక్తి",
    story: "మా కథ",
    storyText: "ఒక చిన్న పరిచయం స్నేహంగా మారింది, ఆ స్నేహం జీవిత బంధంగా మారింది. ఇప్పుడు మా కుటుంబాలు కలిసి ఈ కొత్త అధ్యాయాన్ని ఆనందంగా జరుపుకుంటున్నాయి.",
    gallery: "మధుర జ్ఞాపకాలు",
    galleryText: "మా ప్రయాణంలో ప్రేమతో బంధించిన కొన్ని అందమైన క్షణాలు.",
    rsvp: "మీరు మా వేడుకకు వస్తున్నారా?",
    name: "మీ పేరు",
    attending: "సంతోషంగా వస్తున్నాను",
    notAttending: "రాలేకపోతున్నాను",
    submit: "RSVP పంపండి",
    submitting: "RSVP పంపుతోంది…",
    thanks: "ధన్యవాదాలు! మీ RSVP విజయవంతంగా పంపబడింది.",
    submitError: "మీ RSVP పంపలేకపోయాము. దయచేసి ఇంటర్నెట్ కనెక్షన్ తనిఖీ చేసి మళ్లీ ప్రయత్నించండి.",
    editResponse: "సమాధానం మార్చండి",
    closing: "ప్రేమతో, బొండాడ & సనక కుటుంబాలు",
    language: "English",
    nav: ["మొదలు", "ఆహ్వానం", "వేడుకలు", "వస్త్రధారణ", "ప్రత్యక్షం", "మా కథ", "RSVP"]
  }
};

const HOME_MAP = "https://share.google/aBqH4lphR8gwLiS1z";
const RECEPTION_MAP = "https://share.google/JoGPK2P0mQEoO7gtQ";
const WEDDING_MAP = "https://maps.app.goo.gl/rgPpR6SjsgetBn1XA";
const BRIDE_HOME_MAP = "https://maps.google.com/?q=16.196985,81.152130";
const BRIDE_WEDDING_MAP = "https://share.google/rS7CeuWGiumTjZsAd";
const SANGEETH_MAP = "https://share.google/yi45YcCLDd6HYZUnd";
// Replace this placeholder with each ceremony's YouTube livestream URL before the event.
const YOUTUBE_PLACEHOLDER = "https://www.youtube.com/";
const RSVP_EMAIL_ENDPOINT = "https://formsubmit.co/ajax/sravanthikalyan1122@gmail.com";

const groomDressCodeItems = [
  {
    icon: "🌼",
    en: "Haldi",
    te: "హల్దీ",
    noteEn: "Shades of yellow",
    noteTe: "పసుపు రంగు ఛాయలు",
    colors: ["#f4bd27", "#ffd95c", "#fffdf8"]
  },
  {
    icon: "👑",
    en: "Pellikoduku",
    te: "పెళ్లికొడుకు",
    noteEn: "Festive traditional",
    noteTe: "సాంప్రదాయ వేడుక దుస్తులు",
    colors: ["#f1d6a2", "#8b1e2d", "#f8f1df"]
  },
  {
    icon: "♨",
    en: "Wedding (Muhurtham)",
    te: "వివాహం (ముహూర్తం)",
    noteEn: "Traditional silks",
    noteTe: "సాంప్రదాయ పట్టు వస్త్రాలు",
    colors: ["#9d171a", "#dda205"]
  },
  {
    icon: "🪔",
    en: "Satyanarayana Vratham",
    te: "సత్యనారాయణ వ్రతం",
    noteEn: "Traditional & graceful",
    noteTe: "సాంప్రదాయ & శోభాయమాన",
    colors: ["#f5e4b8", "#c98237", "#6f8b62"]
  },
  {
    icon: "🥂",
    en: "Reception",
    te: "రిసెప్షన్",
    noteEn: "Formal / Indo-western",
    noteTe: "ఫార్మల్ / ఇండో-వెస్ట్రన్",
    colors: ["#101f3d", "#dedede"]
  }
];

const brideDressCodeItems = [
  {
    icon: "♫",
    en: "Sangeeth",
    te: "సంగీత్",
    noteEn: "Glam & sparkle",
    noteTe: "గ్లామ్ & మెరుపులు",
    colors: ["#7928c8", "#ffd46a", "#d75286"]
  },
  {
    icon: "🌼",
    en: "Haldi",
    te: "హల్దీ",
    noteEn: "Shades of yellow",
    noteTe: "పసుపు రంగు ఛాయలు",
    colors: ["#f4bd27", "#ffd95c", "#fffdf8"]
  },
  {
    icon: "🌸",
    en: "Pellikuthuru",
    te: "పెళ్లికూతురు",
    noteEn: "Festive traditional",
    noteTe: "సాంప్రదాయ వేడుక దుస్తులు",
    colors: ["#d85b83", "#e7b7c6", "#4f8062"]
  },
  {
    icon: "♨",
    en: "Wedding (Muhurtham)",
    te: "వివాహం (ముహూర్తం)",
    noteEn: "Traditional silks",
    noteTe: "సాంప్రదాయ పట్టు వస్త్రాలు",
    colors: ["#9d171a", "#dda205"]
  },
  {
    icon: "🥂",
    en: "Reception",
    te: "రిసెప్షన్",
    noteEn: "Formal / Indo-western",
    noteTe: "ఫార్మల్ / ఇండో-వెస్ట్రన్",
    colors: ["#101f3d", "#dedede"]
  }
];

function EventLogo({ name }: { name: string }) {
  const marks: Record<string, React.ReactNode> = {
    haldi: (
      <>
        <path d="M15 36h34c-1.7 9-8.2 14-17 14S16.7 45 15 36Z" />
        <path d="M19 36c2.8-5 7.2-7.5 13-7.5S42.2 31 45 36" />
        <path d="M32 28.5V17" />
        <path d="M32 21c4.5-6.2 9.2-7.5 14-5.5-1.5 5.3-6.2 8-14 8" />
        <path d="M21 42h22" />
        <circle cx="25" cy="34" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="32" cy="32" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="39" cy="34" r="1.4" fill="currentColor" stroke="none" />
      </>
    ),
    pellikoduku: (
      <>
        <path d="M14 35c4-8.2 11.4-12.5 21-11.7 7.8.7 12.6 5 15 11.7-9.8-3.3-26.5-3.3-36 0Z" />
        <path d="M17 35c1.5 8.8 7 14 15 14s13.5-5.2 15-14" />
        <path d="M19.5 29.4c7.8 3.8 17.1 3.8 25 0" />
        <path d="M24 25.2c4.8 2.5 10.9 2.5 16 0" />
        <path d="M32 31v12" />
        <path d="m28.5 39.5 3.5 4 3.5-4-3.5-4-3.5 4Z" />
        <path d="M41 24c.5-6.2 3.8-10.2 8.5-12.5.8 5.4-1 9.6-5.6 12.8" />
        <path d="M49.5 11.5c2.2 2.3 2.4 5.1.5 7.7" />
      </>
    ),
    wedding: (
      <>
        <path d="M17 16c-4 8.5-4.8 19.5-.8 27.5 2.6 5.1 6.8 7 11.8 3.5 2.5-1.8 3.5-5.5 4-9" />
        <path d="M47 16c4 8.5 4.8 19.5.8 27.5-2.6 5.1-6.8 7-11.8 3.5-2.5-1.8-3.5-5.5-4-9" />
        <path d="m27.5 37.5 4.5-4.5 4.5 4.5L32 42l-4.5-4.5Z" />
        <circle cx="17" cy="16" r="3" />
        <circle cx="14.5" cy="26" r="3" />
        <circle cx="16" cy="36" r="3" />
        <circle cx="47" cy="16" r="3" />
        <circle cx="49.5" cy="26" r="3" />
        <circle cx="48" cy="36" r="3" />
        <path d="M28 48c1.2 2 2.5 3.5 4 4.5 1.5-1 2.8-2.5 4-4.5" />
      </>
    ),
    vratham: (
      <>
        <circle cx="32" cy="25" r="11" />
        <circle cx="32" cy="25" r="2.5" />
        <path d="M32 14v8M32 28v8M21 25h8M35 25h8M24.2 17.2l5.6 5.6M34.2 27.8l5.6 5.6M39.8 17.2l-5.6 5.6M29.8 27.8l-5.6 5.6" />
        <path d="M32 48c-5-1.2-8.3-4.2-10-9 4.8-.2 8.2 1.6 10 5.5 1.8-3.9 5.2-5.7 10-5.5-1.7 4.8-5 7.8-10 9Z" />
        <path d="M18 49h28" />
      </>
    ),
    reception: (
      <>
        <path d="M15 49V29c0-9.5 7.6-17 17-17s17 7.5 17 17v20" />
        <path d="M20 49V30c0-6.7 5.3-12 12-12s12 5.3 12 12v19" />
        <path d="M11 49h42M17 42h5M42 42h5" />
        <circle cx="18.5" cy="21" r="3" />
        <circle cx="25" cy="15" r="3" />
        <circle cx="32" cy="12" r="3" />
        <circle cx="39" cy="15" r="3" />
        <circle cx="45.5" cy="21" r="3" />
        <path d="M27 36c1.4-2.3 3-3.5 5-3.5s3.6 1.2 5 3.5c-1.4 2.3-3 3.5-5 3.5S28.4 38.3 27 36Z" />
      </>
    ),
    sangeeth: (
      <>
        <path d="M39 14v27.5c0 5.2-4.2 9.5-9.5 9.5S20 47.7 20 43s4.2-8 9.5-8c2.2 0 4.2.6 5.5 1.6V19l15-4v20.5c0 5.2-4.2 9.5-9.5 9.5S31 41.7 31 37s4.2-8 9.5-8c2.1 0 4 .6 5.5 1.6V12l-7 2Z" />
        <path d="M16 19c3.2-3.7 6.5-3.7 9.8 0M12 25c5.8-6.8 11.7-6.8 17.5 0" />
      </>
    )
  };

  return (
    <svg viewBox="0 0 64 64" role="img" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {marks[name]}
      </g>
    </svg>
  );
}

const groomEvents = [
  {
    en: "Haldi", te: "హల్దీ", icon: "haldi", tone: "haldi",
    dateEn: "November 21, 2026", dateTe: "నవంబర్ 21, 2026",
    timeEn: "10:00 AM", timeTe: "ఉదయం 10:00",
    venueEn: "Kalyan's Home", venueTe: "కళ్యాణ్ నివాసం", mapUrl: HOME_MAP,
    youtubeUrl: YOUTUBE_PLACEHOLDER
  },
  {
    en: "Pellikoduku", te: "పెళ్లికొడుకు", icon: "pellikoduku", tone: "rose",
    dateEn: "November 22, 2026", dateTe: "నవంబర్ 22, 2026",
    timeEn: "Morning", timeTe: "ఉదయం",
    venueEn: "Kalyan's Home", venueTe: "కళ్యాణ్ నివాసం", mapUrl: HOME_MAP,
    youtubeUrl: YOUTUBE_PLACEHOLDER
  },
  {
    en: "Wedding", te: "శుభ వివాహం", icon: "wedding", tone: "violet", pending: false,
    dateEn: "November 22, 2026", dateTe: "నవంబర్ 22, 2026",
    timeEn: "Muhurtham at 8:42 PM", timeTe: "ముహూర్తం రాత్రి 8:42 గంటలకు",
    venueEn: "Suvarna Kalyana Mandapam", venueTe: "సువర్ణ కళ్యాణ మండపం", mapUrl: WEDDING_MAP,
    youtubeUrl: YOUTUBE_PLACEHOLDER
  },
  {
    en: "Satyanarayana Vratham", te: "సత్యనారాయణ వ్రతం", icon: "vratham", tone: "sandal",
    dateEn: "November 24, 2026", dateTe: "నవంబర్ 24, 2026",
    timeEn: "Morning", timeTe: "ఉదయం",
    venueEn: "Kalyan's Home", venueTe: "కళ్యాణ్ నివాసం", mapUrl: HOME_MAP,
    youtubeUrl: YOUTUBE_PLACEHOLDER
  },
  {
    en: "Reception", te: "వివాహ విందు", icon: "reception", tone: "emerald",
    dateEn: "November 24, 2026", dateTe: "నవంబర్ 24, 2026",
    timeEn: "Afternoon", timeTe: "మధ్యాహ్నం",
    venueEn: "Anne Vaari Kalyana Mandapam", venueTe: "అన్నే వారి కళ్యాణ మండపం", mapUrl: RECEPTION_MAP,
    youtubeUrl: YOUTUBE_PLACEHOLDER
  }
];

const brideEvents = [
  {
    en: "Sangeeth", te: "సంగీత్", icon: "sangeeth", tone: "violet",
    dateEn: "November 20, 2026", dateTe: "నవంబర్ 20, 2026",
    timeEn: "7:00 PM", timeTe: "సాయంత్రం 7:00",
    venueEn: "Palakurty Vari Kalyana Mandapam", venueTe: "పాలకుర్తి వారి కళ్యాణ మండపం", mapUrl: SANGEETH_MAP,
    youtubeUrl: YOUTUBE_PLACEHOLDER
  },
  {
    en: "Haldi", te: "హల్దీ", icon: "haldi", tone: "haldi",
    dateEn: "November 21, 2026", dateTe: "నవంబర్ 21, 2026",
    timeEn: "10:00 AM", timeTe: "ఉదయం 10:00",
    venueEn: "Sravanthi Nilayam", venueTe: "స్రవంతి నిలయం", mapUrl: BRIDE_HOME_MAP,
    youtubeUrl: YOUTUBE_PLACEHOLDER
  },
  {
    en: "Pellikuthuru", te: "పెళ్లికూతురు", icon: "pellikoduku", tone: "rose",
    dateEn: "November 22, 2026", dateTe: "నవంబర్ 22, 2026",
    timeEn: "8:00 AM", timeTe: "ఉదయం 8:00",
    venueEn: "Sravanthi Nilayam", venueTe: "స్రవంతి నిలయం", mapUrl: BRIDE_HOME_MAP,
    youtubeUrl: YOUTUBE_PLACEHOLDER
  },
  {
    en: "Wedding", te: "శుభ వివాహం", icon: "wedding", tone: "sandal", pending: false,
    dateEn: "November 22, 2026", dateTe: "నవంబర్ 22, 2026",
    timeEn: "Muhurtham at 8:42 PM", timeTe: "ముహూర్తం రాత్రి 8:42 గంటలకు",
    venueEn: "Suvarna Kalyana Mandapam", venueTe: "సువర్ణ కళ్యాణ మండపం", mapUrl: BRIDE_WEDDING_MAP,
    youtubeUrl: YOUTUBE_PLACEHOLDER
  },
  {
    en: "Reception", te: "వివాహ విందు", icon: "reception", tone: "emerald",
    dateEn: "November 24, 2026", dateTe: "నవంబర్ 24, 2026",
    timeEn: "12:00 PM", timeTe: "మధ్యాహ్నం 12:00",
    venueEn: "Anne Vaari Kalyana Mandapam", venueTe: "అన్నే వారి కళ్యాణ మండపం", mapUrl: RECEPTION_MAP,
    youtubeUrl: YOUTUBE_PLACEHOLDER
  }
];

// Ceremony times are fixed to India Standard Time so every guest sees the same countdown.
const groomCountdownEvents = [
  {
    en: "Haldi", te: "హల్దీ",
    dateEn: "November 21, 2026", dateTe: "నవంబర్ 21, 2026",
    timeEn: "10:00 AM", timeTe: "ఉదయం 10:00",
    start: "2026-11-21T10:00:00+05:30", end: "2026-11-21T14:00:00+05:30",
    venueEn: "Kalyan's Home", venueTe: "కళ్యాణ్ నివాసం", mapUrl: HOME_MAP
  },
  {
    en: "Pellikoduku", te: "పెళ్లికొడుకు",
    dateEn: "November 22, 2026", dateTe: "నవంబర్ 22, 2026",
    timeEn: "8:00 AM", timeTe: "ఉదయం 8:00",
    start: "2026-11-22T08:00:00+05:30", end: "2026-11-22T11:00:00+05:30",
    venueEn: "Kalyan's Home", venueTe: "కళ్యాణ్ నివాసం", mapUrl: HOME_MAP
  },
  {
    en: "Satyanarayana Vratham", te: "సత్యనారాయణ వ్రతం",
    dateEn: "November 24, 2026", dateTe: "నవంబర్ 24, 2026",
    timeEn: "6:00 AM", timeTe: "ఉదయం 6:00",
    start: "2026-11-24T06:00:00+05:30", end: "2026-11-24T10:00:00+05:30",
    venueEn: "Kalyan's Home", venueTe: "కళ్యాణ్ నివాసం", mapUrl: HOME_MAP
  },
  {
    en: "Reception", te: "వివాహ విందు",
    dateEn: "November 24, 2026", dateTe: "నవంబర్ 24, 2026",
    timeEn: "12:00 PM", timeTe: "మధ్యాహ్నం 12:00",
    start: "2026-11-24T12:00:00+05:30", end: "2026-11-24T16:00:00+05:30",
    venueEn: "Anne Vaari Kalyana Mandapam", venueTe: "అన్నే వారి కళ్యాణ మండపం", mapUrl: RECEPTION_MAP
  }
];

const brideCountdownEvents = [
  {
    en: "Sangeeth", te: "సంగీత్",
    dateEn: "November 20, 2026", dateTe: "నవంబర్ 20, 2026",
    timeEn: "7:00 PM", timeTe: "సాయంత్రం 7:00",
    start: "2026-11-20T19:00:00+05:30", end: "2026-11-20T23:00:00+05:30",
    venueEn: "Palakurty Vari Kalyana Mandapam", venueTe: "పాలకుర్తి వారి కళ్యాణ మండపం", mapUrl: SANGEETH_MAP
  },
  {
    en: "Haldi", te: "హల్దీ",
    dateEn: "November 21, 2026", dateTe: "నవంబర్ 21, 2026",
    timeEn: "10:00 AM", timeTe: "ఉదయం 10:00",
    start: "2026-11-21T10:00:00+05:30", end: "2026-11-21T14:00:00+05:30",
    venueEn: "Sravanthi Nilayam", venueTe: "స్రవంతి నిలయం", mapUrl: BRIDE_HOME_MAP
  },
  {
    en: "Pellikuthuru", te: "పెళ్లికూతురు",
    dateEn: "November 22, 2026", dateTe: "నవంబర్ 22, 2026",
    timeEn: "8:00 AM", timeTe: "ఉదయం 8:00",
    start: "2026-11-22T08:00:00+05:30", end: "2026-11-22T11:00:00+05:30",
    venueEn: "Sravanthi Nilayam", venueTe: "స్రవంతి నిలయం", mapUrl: BRIDE_HOME_MAP
  },
  {
    en: "Reception", te: "వివాహ విందు",
    dateEn: "November 24, 2026", dateTe: "నవంబర్ 24, 2026",
    timeEn: "12:00 PM", timeTe: "మధ్యాహ్నం 12:00",
    start: "2026-11-24T12:00:00+05:30", end: "2026-11-24T16:00:00+05:30",
    venueEn: "Anne Vaari Kalyana Mandapam", venueTe: "అన్నే వారి కళ్యాణ మండపం", mapUrl: RECEPTION_MAP
  }
];

const petals = [
  [4, 0, 11, "marigold", "right"], [10, 3, 13, "jasmine", "left"],
  [16, 7, 10, "rose", "right"], [22, 1, 14, "jasmine", "left"],
  [28, 5, 12, "marigold", "right"], [35, 9, 15, "jasmine", "left"],
  [42, 2, 11, "rose", "right"], [49, 6, 13, "jasmine", "left"],
  [56, 10, 14, "marigold", "right"], [62, 4, 10, "rose", "left"],
  [68, 8, 12, "jasmine", "right"], [74, 1, 15, "marigold", "left"],
  [80, 6, 11, "jasmine", "right"], [86, 3, 13, "rose", "left"],
  [92, 9, 14, "marigold", "right"], [97, 5, 12, "jasmine", "left"],
  [31, 12, 15, "rose", "left"], [71, 11, 13, "jasmine", "right"]
] as const;

function FlowerFall({ burst = false, active = true, siteWide = false }: { burst?: boolean; active?: boolean; siteWide?: boolean }) {
  return (
    <div className={`${burst ? "floral-shower" : siteWide ? "site-flower-fall" : "flower-fall"} ${active ? "active" : ""}`} aria-hidden="true">
      {petals.map(([left, delay, duration, flower, drift], index) => (
        <span
          className={`petal ${flower} drift-${drift}`}
          key={`${flower}-${index}`}
          style={{
            left: `${left}%`,
            animationDelay: burst ? `${(delay % 5) * 0.12}s` : `-${delay}s`,
            animationDuration: burst ? `${1.7 + (index % 4) * 0.22}s` : `${duration}s`
          }}
        />
      ))}
    </div>
  );
}

function SideThoranams({ siteWide = false }: { siteWide?: boolean }) {
  return (
    <div className={`side-thoranams ${siteWide ? "site-wide" : ""}`} aria-hidden="true">
      {["left", "right"].map((side) => (
        <div className={`thoranam thoranam-${side}`} key={side}>
          <span className="thoranam-crown" />
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <span
              className="thoranam-cluster"
              key={item}
              style={{ top: `${13 + item * 14}%`, animationDelay: `${item * 0.28}s` }}
            >
              <i className="mango-leaf leaf-one" />
              <b className="marigold-knot" />
              <i className="mango-leaf leaf-two" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [team, setTeam] = useState<Team | null>(null);
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [openingEnvelope, setOpeningEnvelope] = useState(false);
  const [language, setLanguage] = useState<Language | null>(null);
  const [enteringLanguage, setEnteringLanguage] = useState<Language | null>(null);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [rsvpStatus, setRsvpStatus] = useState<"yes" | "no">("yes");
  const [submitted, setSubmitted] = useState(false);
  const [submittingRsvp, setSubmittingRsvp] = useState(false);
  const [rsvpError, setRsvpError] = useState("");
  const [now, setNow] = useState(0);
  const t = useMemo(() => copy[language ?? "en"], [language]);
  const isBrideTeam = team === "bride";
  const events = isBrideTeam ? brideEvents : groomEvents;
  const countdownEvents = isBrideTeam ? brideCountdownEvents : groomCountdownEvents;
  const firstName = isBrideTeam ? "Sravanthi" : "Kalyan";
  const secondName = isBrideTeam ? "Kalyan" : "Sravanthi";
  const firstInitial = isBrideTeam ? "S" : "K";
  const secondInitial = isBrideTeam ? "K" : "S";
  const firstTelugu = isBrideTeam ? "నాగ సాయి స్రవంతి సనక" : "కళ్యాణ్ చైతన్య బొండాడ";
  const secondTelugu = isBrideTeam ? "కళ్యాణ్ చైతన్య బొండాడ" : "నాగ సాయి స్రవంతి సనక";

  useEffect(() => {
    const updateCountdown = () => setNow(Date.now());
    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!language) return;
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      elements.forEach((element) => element.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -45px" });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [language, team]);

  const countdown = useMemo(() => {
    const empty = { title: "", note: "", values: [0, 0, 0, 0], complete: false, venue: "", mapUrl: "" };
    if (!now) return empty;

    const active = countdownEvents.find((event) => {
      const start = new Date(event.start).getTime();
      const end = new Date(event.end).getTime();
      return now >= start && now < end;
    });
    const next = countdownEvents.find((event) => now < new Date(event.start).getTime());
    const selected = active ?? next;

    if (!selected) {
      return {
        title: language === "te" ? "మా వేడుకలు పూర్తయ్యాయి" : "Our celebrations are complete",
        note: language === "te" ? "మాతో కలిసి ఆనందించినందుకు ధన్యవాదాలు" : "Thank you for celebrating with us",
        values: [0, 0, 0, 0],
        complete: true,
        venue: "",
        mapUrl: ""
      };
    }

    const target = new Date(active ? selected.end : selected.start).getTime();
    const distance = Math.max(0, target - now);
    const days = Math.floor(distance / 86_400_000);
    const hours = Math.floor((distance % 86_400_000) / 3_600_000);
    const minutes = Math.floor((distance % 3_600_000) / 60_000);
    const seconds = Math.floor((distance % 60_000) / 1000);
    const name = language === "te" ? selected.te : selected.en;
    const date = language === "te" ? selected.dateTe : selected.dateEn;
    const time = language === "te" ? selected.timeTe : selected.timeEn;
    const venue = language === "te" ? selected.venueTe : selected.venueEn;

    return {
      title: active
        ? (language === "te" ? `${name} ఇప్పుడు జరుగుతోంది` : `${name} is happening now`)
        : (language === "te" ? `తదుపరి వేడుక: ${name} · ${date} · ${time}` : `Next: ${name} · ${date} · ${time}`),
      note: active
        ? (language === "te" ? "వేడుక ముగియడానికి మిగిలిన సమయం" : "Time remaining in the ceremony")
        : (language === "te" ? "భారత కాలమానం ప్రకారం ప్రారంభ సమయం" : "Countdown based on India Standard Time"),
      values: [days, hours, minutes, seconds],
      complete: false,
      venue,
      mapUrl: selected.mapUrl
    };
  }, [language, now, team]);

  async function submitRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRsvp) return;

    setSubmittingRsvp(true);
    setRsvpError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const guestName = String(formData.get("guestName") ?? "").trim();

    try {
      const response = await fetch(RSVP_EMAIL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "Guest name": guestName,
          "Attendance": rsvpStatus === "yes" ? "Joyfully attending" : "Unable to attend",
          "Invitation side": isBrideTeam ? "Bride Team" : "Groom Team",
          "Response language": language === "te" ? "Telugu" : "English",
          "Submitted at": new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          _subject: `Wedding RSVP: ${guestName} — ${rsvpStatus === "yes" ? "Attending" : "Unable to attend"}`,
          _template: "table",
          _captcha: "false",
          _honey: String(formData.get("website") ?? "")
        })
      });

      if (!response.ok) throw new Error("RSVP request failed");

      setSubmitted(true);
      form.reset();
    } catch {
      setRsvpError(t.submitError);
    } finally {
      setSubmittingRsvp(false);
    }
  }

  function chooseLanguage(selectedLanguage: Language) {
    if (enteringLanguage) return;
    setEnteringLanguage(selectedLanguage);
    window.setTimeout(() => setLanguage(selectedLanguage), 1500);
  }

  function openInvitation() {
    if (openingEnvelope) return;
    setOpeningEnvelope(true);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => setInvitationOpened(true), reducedMotion ? 150 : 1450);
  }

  function chooseTeam(selectedTeam: Team) {
    setTeam(selectedTeam);
  }

  function switchTeam() {
    setTeam(isBrideTeam ? "groom" : "bride");
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.volume = 0.24;
      try {
        await audio.play();
        setMusicOn(true);
      } catch {
        setMusicOn(false);
      }
    } else {
      audio.pause();
      setMusicOn(false);
    }
  }

  if (!team) {
    return (
      <main className="team-gate">
        <SideThoranams />
        <div className="gate-glow" />
        <div className="temple-lines" aria-hidden="true"><span /><span /><span /></div>
        <div className="team-card">
          <p className="eyebrow">Choose your celebration side · మీ వైపు ఎంచుకోండి</p>
          <h1>Whose invitation are you opening?</h1>
          <p className="team-intro">Both paths lead to the same beautiful forever.</p>
          <div className="team-actions">
            <button className="bride-team" onClick={() => chooseTeam("bride")}>
              <span>❦</span><strong>Bride Team</strong><small>Sravanthi&apos;s family</small>
            </button>
            <button className="groom-team" onClick={() => chooseTeam("groom")}>
              <span>✦</span><strong>Groom Team</strong><small>Kalyan&apos;s family</small>
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!invitationOpened) {
    return (
      <main className={`envelope-gate ${openingEnvelope ? "opening" : ""}`}>
        <SideThoranams />
        <div className="gate-glow" />
        <div className="temple-lines" aria-hidden="true"><span /><span /><span /></div>
        <div className="envelope-intro">
          <p className="envelope-eyebrow">A sacred invitation awaits · శుభ ఆహ్వానం</p>
          <div className="envelope-scene" aria-label="Sealed wedding invitation">
            <div className="envelope-shell" aria-hidden="true">
              <div className="envelope-back" />
              <div className="envelope-letter">
                <small>శ్రీనివాస కళ్యాణం</small>
                <strong>{firstInitial} <i>&amp;</i> {secondInitial}</strong>
                <span>{firstName} &amp; {secondName}</span>
              </div>
              <div className="envelope-flap" />
              <div className="envelope-front" />
              <div className="wax-seal">{firstInitial}<span>&amp;</span>{secondInitial}</div>
            </div>
          </div>
          <button
            className="open-invitation-button"
            onClick={openInvitation}
            disabled={openingEnvelope}
          >
            {openingEnvelope ? "Opening…" : "Open Invitation"} <span>✦</span>
          </button>
          <p className="open-telugu">ఆహ్వాన పత్రికను తెరవండి</p>
        </div>
      </main>
    );
  }

  if (!language) {
    return (
      <main className="language-gate">
        <FlowerFall burst active={Boolean(enteringLanguage)} />
        <SideThoranams />
        <div className="gate-glow" />
        <div className="temple-lines" aria-hidden="true"><span /><span /><span /></div>
        <div className="gate-card reveal">
          <p className="eyebrow">శ్రీనివాస కళ్యాణం</p>
          <div className="monogram" aria-label={`${firstName} and ${secondName}`}>{firstInitial} <i>&</i> {secondInitial}</div>
          <h1>{firstName} <span>&</span> {secondName}</h1>
          <p className="telugu-names">{isBrideTeam ? "స్రవంతి & కళ్యాణ్" : "కళ్యాణ్ & స్రవంతి"}</p>
          <p className="hashtag">#SRAVANTHIKALYANam</p>
          <div className="gold-rule"><span>✦</span></div>
          <p className="choose-label">Choose your language · మీ భాషను ఎంచుకోండి</p>
          <div className="language-actions">
            <button disabled={Boolean(enteringLanguage)} onClick={() => chooseLanguage("en")}>English</button>
            <button disabled={Boolean(enteringLanguage)} onClick={() => chooseLanguage("te")}>తెలుగు</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <audio
        ref={audioRef}
        src="/kalyan-sravanthi-traditional-instrumental.mp3"
        loop
        preload="metadata"
      />
      <FlowerFall siteWide />
      <SideThoranams siteWide />
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="nav-mark" href="#home">{firstInitial}<span>&</span>{secondInitial}</a>
        <div className="nav-links">
          {t.nav.map((item, index) => (
            <a href={["#home", "#invitation", "#events", "#dress-code", "#live", "#story", "#rsvp"][index]} key={item}>{item}</a>
          ))}
        </div>
        <div className="nav-actions">
          <button onClick={switchTeam} className="team-switch">{isBrideTeam ? "Groom Team" : "Bride Team"}</button>
          <button onClick={() => setLanguage(language === "en" ? "te" : "en")} className="lang-switch">{t.language}</button>
          <button onClick={toggleMusic} className={`music-button ${musicOn ? "playing" : ""}`} aria-label={musicOn ? "Pause music" : "Play music"}>
            <span className="music-symbol" aria-hidden="true">{musicOn ? "Ⅱ" : "♪"}</span>
            <span className="music-hint">
              {language === "te"
                ? (musicOn ? "సంగీతం ఆపడానికి నొక్కండి" : "సంగీతం వినడానికి నొక్కండి")
                : (musicOn ? "Tap to stop music" : "Tap to play music")}
            </span>
          </button>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-shade" />
        <div className="hero-content reveal">
          <p className="eyebrow">A sacred beginning · ఒక శుభారంభం</p>
          <div className="hero-name-wrap">
            <div className="name-sparkles" aria-hidden="true">{[1, 2, 3, 4, 5, 6].map((spark) => <span key={spark}>✦</span>)}</div>
            <h1>{firstName} <span>&</span> {secondName}</h1>
          </div>
          <p className="hero-telugu">{firstTelugu}<br /><span>తో</span><br />{secondTelugu}</p>
          <div className="gold-rule light"><span>❦</span></div>
          <p className="hero-note">Two souls · Two families · One beautiful forever</p>
          <p className="hero-hashtag">#SRAVANTHIKALYANam</p>
          <a className="primary-button" href="#invitation">{t.enter}<span>↓</span></a>
        </div>
        <div className="scroll-cue">SCROLL TO BEGIN</div>
      </section>

      <section className="invitation section-pad" id="invitation">
        <div className="mandala" aria-hidden="true" />
        <div className="section-card invitation-card" data-reveal>
          <p className="sacred-mark">॥ శ్రీ వేంకటేశ్వరాయ నమః ॥</p>
          <div className="ganesha-blessing">
            <img className="ganesha-emblem" src="/ganesha-emblem.png" alt="Lord Ganesha" />
            <p>॥ ఓం గణేశాయ నమః ॥</p>
          </div>
          <p className="eyebrow plum">Together with our families</p>
          <h2>{t.blessing}</h2>
          <p className="invitation-copy">{t.invitation}</p>
          <div className="couple-grid">
            {isBrideTeam ? (
              <>
                <article>
                  <p className="role">THE BRIDE</p>
                  <h3>Naga Sai Sravanthi<br />Sanaka</h3>
                  <p>{t.brideParents}</p>
                </article>
                <div className="with-medallion">with</div>
                <article>
                  <p className="role">THE GROOM</p>
                  <h3>Kalyan Chaitanya<br />Bondada</h3>
                  <p>{t.groomParents}</p>
                </article>
              </>
            ) : (
              <>
                <article>
                  <p className="role">THE GROOM</p>
                  <h3>Kalyan Chaitanya<br />Bondada</h3>
                  <p>{t.groomParents}</p>
                </article>
                <div className="with-medallion">with</div>
                <article>
                  <p className="role">THE BRIDE</p>
                  <h3>Naga Sai Sravanthi<br />Sanaka</h3>
                  <p>{t.brideParents}</p>
                </article>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="countdown-section section-pad">
        <div className="section-heading light-heading" data-reveal>
          <p className="eyebrow">A special day awaits</p>
          <h2>{countdown.title || (language === "te" ? "కౌంట్‌డౌన్ ప్రారంభమవుతోంది" : "Starting the countdown")}</h2>
        </div>
        <div className="countdown-grid" aria-live="polite" aria-label="Live ceremony countdown">
          {(language === "te" ? ["రోజులు", "గంటలు", "నిమిషాలు", "సెకండ్లు"] : ["Days", "Hours", "Minutes", "Seconds"]).map((label, index) => (
            <div key={label}><strong key={countdown.values[index]}>{String(countdown.values[index]).padStart(2, "0")}</strong><span>{label}</span></div>
          ))}
        </div>
        <p className="countdown-note">{countdown.note}</p>
        {countdown.mapUrl && (
          <a className="countdown-location" href={countdown.mapUrl} target="_blank" rel="noreferrer">
            <span>⌖</span>{countdown.venue}<small>{language === "te" ? "మ్యాప్స్‌లో తెరవండి" : "Open location in Maps"} ↗</small>
          </a>
        )}
      </section>

      <section className="events section-pad" id="events">
        <div className="section-heading" data-reveal>
          <p className="eyebrow plum">Love · Tradition · Togetherness</p>
          <h2>{t.celebration}</h2>
          <p>{t.eventIntro}</p>
        </div>
        <div className="event-grid">
          {events.map((event, index) => (
            <article
              className={`event-card ${event.tone}`}
              data-reveal
              key={event.en}
              style={{ "--reveal-delay": `${index * 120}ms` } as React.CSSProperties}
            >
              <span className="event-icon"><EventLogo name={event.icon} /></span>
              <p>{language === "en" ? event.te : event.en}</p>
              <h3>{language === "en" ? event.en : event.te}</h3>
              <div className="mini-rule" />
              {event.pending ? (
                <div className="event-details">
                  <strong>{t.coming}</strong>
                  {event.venueEn && <span>{language === "en" ? event.venueEn : event.venueTe}</span>}
                </div>
              ) : (
                <div className="event-details">
                  <strong>{language === "en" ? event.dateEn : event.dateTe}</strong>
                  <span>{language === "en" ? event.timeEn : event.timeTe}</span>
                  <span>{language === "en" ? event.venueEn : event.venueTe}</span>
                </div>
              )}
              <div className="event-actions">
                {event.mapUrl ? <a href={event.mapUrl} target="_blank" rel="noreferrer">{t.map} ↗</a> : <button disabled>{t.map}</button>}
                {event.youtubeUrl && <a href={event.youtubeUrl} target="_blank" rel="noreferrer">▶ {t.youtube}</a>}
              </div>
            </article>
          ))}
        </div>
        <div className="contact-card" data-reveal>
          <span>{t.contact}</span>
          <strong>{isBrideTeam ? "Sarala" : "Raja"}</strong>
          <a href={isBrideTeam ? "tel:+918985820602" : "tel:+919491439450"}>{isBrideTeam ? "+91 89858 20602" : "+91 94914 39450"}</a>
        </div>
      </section>

      <section className="dress-code section-pad" id="dress-code">
        <div className="dress-pattern" aria-hidden="true" />
        <div className="section-heading dress-heading" data-reveal>
          <p className="eyebrow plum">Celebrate in colour</p>
          <h2>{t.dressCode}</h2>
          <p>{t.dressIntro}</p>
          <div className="dress-divider" aria-hidden="true"><span>🪔</span></div>
        </div>
        <div className="dress-grid">
          {(isBrideTeam ? brideDressCodeItems : groomDressCodeItems).map((item, index) => (
            <article
              className="dress-card"
              data-reveal
              key={item.en}
              style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
            >
              <span className="dress-knot" aria-hidden="true" />
              <h3><span aria-hidden="true">{item.icon}</span>{language === "te" ? item.te : item.en}</h3>
              <p>{language === "te" ? item.noteTe : item.noteEn}</p>
              <div className="dress-swatches" aria-label={language === "te" ? `${item.te} రంగులు` : `${item.en} colours`}>
                {item.colors.map((color) => (
                  <span key={color} style={{ backgroundColor: color }} />
                ))}
              </div>
            </article>
          ))}
        </div>
        <p className="dress-note" data-reveal>
          {language === "te"
            ? "ఇవి సూచించిన రంగులు మాత్రమే — మీకు నచ్చిన శైలిలో ముస్తాబై ఆనందంగా రండి."
            : "These colours are a friendly guide—wear them in a style that feels beautifully you."}
        </p>
      </section>

      <section className="live-section section-pad" id="live">
        <div className="live-pattern" aria-hidden="true" />
        <div className="live-card" data-reveal>
          <span className="live-knot" aria-hidden="true" />
          <div className="broadcast-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" role="img">
              <circle cx="32" cy="32" r="5" />
              <path d="M22 22a14 14 0 0 0 0 20M42 22a14 14 0 0 1 0 20" />
              <path d="M15 15a24 24 0 0 0 0 34M49 15a24 24 0 0 1 0 34" />
            </svg>
          </div>
          <p className="eyebrow plum">YouTube Live</p>
          <h2>{t.live}</h2>
          <div className="live-divider" aria-hidden="true"><span>🪔</span></div>
          <p className="live-intro">{t.liveIntro}</p>
          <p className="live-couple">
            {isBrideTeam
              ? (language === "te" ? "స్రవంతి & కళ్యాణ్ వివాహ వేడుకలు" : "Sravanthi & Kalyan Wedding Celebrations")
              : (language === "te" ? "కళ్యాణ్ & స్రవంతి వివాహ వేడుకలు" : "Kalyan & Sravanthi Wedding Celebrations")}
          </p>
          <a className="live-button" href={YOUTUBE_PLACEHOLDER} target="_blank" rel="noreferrer">
            <span aria-hidden="true">▶</span>{t.watchLive}
          </a>
          <small>{language === "te" ? "కార్యక్రమానికి ముందు ప్రత్యక్ష ప్రసార లింక్ నవీకరించబడుతుంది" : "The livestream link will be updated before the ceremony"}</small>
        </div>
      </section>

      <section className="story section-pad" id="story">
        <div className="story-copy" data-reveal>
          <p className="eyebrow">Somewhere between hello and forever</p>
          <h2>{t.story}</h2>
          <p>{t.storyText}</p>
          <div className="story-steps">
            {["Hello", "Friendship", "Plot twist", "Forever"].map((step, i) => <div key={step}><span>0{i + 1}</span><strong>{step}</strong></div>)}
          </div>
        </div>
        <div className="story-art" data-reveal>
          <a className="story-photo" href="/couple-engagement-editorial.webp" target="_blank" rel="noreferrer">
            <img src="/couple-engagement-editorial.webp" alt="Kalyan and Sravanthi in traditional attire at their engagement celebration" loading="lazy" />
            <span>{language === "te" ? "ఇక్కడి నుంచి మన ఎప్పటికీ మొదలైంది" : "From this moment, our forever began"}</span>
          </a>
        </div>
      </section>

      <section className="gallery section-pad">
        <div className="section-heading" data-reveal>
          <p className="eyebrow plum">Captured with love</p>
          <h2>{t.gallery}</h2>
          <p>{t.galleryText}</p>
        </div>
        <div className="gallery-grid">
          <a className="gallery-photo g1" data-reveal href="/couple-mountain-lake.jpg" target="_blank" rel="noreferrer">
            <img src="/couple-mountain-lake.jpg" alt="Kalyan and Sravanthi overlooking a mountain lake" loading="lazy" />
            <span><strong>{language === "te" ? "కలిసి చూసే ప్రతి దృశ్యం మరింత అందంగా ఉంటుంది" : "Every view is better together"}</strong><small>{language === "te" ? "పూర్తి చిత్రాన్ని చూడండి ↗" : "View full photo ↗"}</small></span>
          </a>
          <a className="gallery-photo g2" data-reveal href="/couple-stone-arches.jpg" target="_blank" rel="noreferrer">
            <img src="/couple-stone-arches.jpg" alt="Kalyan and Sravanthi smiling beside stone arches" loading="lazy" />
            <span><strong>{language === "te" ? "స్నేహం నుంచి జీవిత బంధం వరకు" : "From friendship to forever"}</strong><small>{language === "te" ? "పూర్తి చిత్రాన్ని చూడండి ↗" : "View full photo ↗"}</small></span>
          </a>
          <a className="gallery-photo g3" data-reveal href="/couple-temple-portrait.jpg" target="_blank" rel="noreferrer">
            <img src="/couple-temple-portrait.jpg" alt="Kalyan and Sravanthi together at a temple" loading="lazy" />
            <span><strong>{language === "te" ? "ఆశీస్సులతో మొదలైన అందమైన ప్రయాణం" : "A beautiful journey, blessed from the beginning"}</strong><small>{language === "te" ? "పూర్తి చిత్రాన్ని చూడండి ↗" : "View full photo ↗"}</small></span>
          </a>
        </div>
      </section>

      <section className="rsvp section-pad" id="rsvp">
        <div className="rsvp-card" data-reveal>
          <p className="eyebrow">Your presence is our blessing</p>
          <h2>{t.rsvp}</h2>
          {submitted ? (
            <div className="success-message"><span>✓</span><p>{t.thanks}</p><button onClick={() => setSubmitted(false)}>{t.editResponse}</button></div>
          ) : (
            <form onSubmit={submitRsvp}>
              <label><span>{t.name}</span><input name="guestName" required placeholder={t.name} /></label>
              <input className="rsvp-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="attendance-choice">
                <button type="button" className={rsvpStatus === "yes" ? "selected" : ""} onClick={() => setRsvpStatus("yes")}>✓ {t.attending}</button>
                <button type="button" className={rsvpStatus === "no" ? "selected" : ""} onClick={() => setRsvpStatus("no")}>× {t.notAttending}</button>
              </div>
              <input type="hidden" name="attendance" value={rsvpStatus} />
              {rsvpError && <p className="rsvp-error" role="alert">{rsvpError}</p>}
              <button className="primary-button submit-button" type="submit" disabled={submittingRsvp}>
                {submittingRsvp ? t.submitting : t.submit}<span>{submittingRsvp ? "…" : "→"}</span>
              </button>
            </form>
          )}
        </div>
      </section>

      <footer>
        <div className="footer-monogram">{firstInitial} <span>&</span> {secondInitial}</div>
        <p>{isBrideTeam ? (language === "te" ? "ప్రేమతో, సనక & బొండాడ కుటుంబాలు" : "With love, the Sanaka & Bondada families") : t.closing}</p>
        <strong className="footer-hashtag">#SRAVANTHIKALYANam</strong>
        <small>Made with love for our celebration</small>
        <small className="footer-copyright">© 2026 Kalyan &amp; Sravanthi. All rights reserved.</small>
      </footer>
    </main>
  );
}
