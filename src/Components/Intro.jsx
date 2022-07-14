/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

function Intro() {
  const [toggle, setToggle] = useState(true);

  let numChar = 0;
  let test2 = '';
  while (numChar <= 100) {
    test2 += text[numChar];
    numChar += 1;
  }
  test2 += ' ...';

  const test3 = text.split('\n');

  return (
    <section className="company-intro">
      <div className="item-image-holder m-bottom--16">
        <div
          className="item-image"
          style={{
            backgroundImage:
              'url(' +
              'https://cdn.shopify.com/s/files/1/0536/8990/9410/products/image_2d73ff50-2829-4fbc-995f-9f74b2cf689b_600x.jpg?v=1645647673' +
              ')',
          }}
        />
      </div>
      <div className="m-bottom--24">
        <h3 className="font--bold m-bottom--16 company-name">
          Blinkk.Esthetics
        </h3>
      </div>
      <a
        className="w-button w-button--large w-button--primary w-button--rounded m-bottom--24"
        href="google.com"
        rel="nofollow"
      >
        Book an Appointment
      </a>
      <p className="m-bottom--32">
        {toggle
          ? test2
          : test3.map((el) => {
              return (
                <>
                  {el}
                  <br />
                </>
              );
            })}{' '}
        <a
          className="font--bold blue cursor hover:underline"
          onClick={() => setToggle((prev) => !prev)}
        >
          {toggle ? 'More' : 'Less'}
        </a>
      </p>
    </section>
  );
}

const text =
  '- Feel free to head straight in at the time of your appointment, enter in through my front door.\n' +
  '- Please be on time and only book appointments you can make! (Always better to be 5 min early than 5 min late)\n' +
  '- Let me know ASAP if you need to cancel\n' +
  '- Last minute cancellations results in a $5 fee next haircut.\n' +
  '- Accepting cash (preferred) and zelle (sparingly)\n' +
  '- If you need an emergency haircut and I am booked for that day, message me personally on Instagram or iMessage and I will work with you.\n' +
  '- Any questions feel free to message me on Instagram @scotty_blendz or text my number 408-838-6303\n\n' +
  'Thank you for choosing me to be your barber, looking forward to meeting all of you guys';

export default Intro;
