/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
  useContext
} from 'react';
import AppContext from '../Contexts/app-context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }

  return { value: '', isValid: false };
};

const phoneReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length === 14 };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length === 14 };
  }

  return { value: '', isValid: false };
};

const firstNameReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }

  return { value: '', isValid: false };
};

const lastNameReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }

  return { value: '', isValid: false };
};

function ReservationForm() {
  const ctx = useContext(AppContext);
  const Ref = useRef(null);
  const [timer, setTimer] = useState('00:00');
  const navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null
  });

  const [phoneState, dispatchPhone] = useReducer(phoneReducer, {
    value: '',
    isValid: null
  });

  const [firstNameState, dispatchFirstName] = useReducer(firstNameReducer, {
    value: '',
    isValid: null
  });

  const [lastNameState, dispatchLastName] = useReducer(lastNameReducer, {
    value: '',
    isValid: null
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: phoneIsValid } = phoneState;
  const { isValid: lastNameIsValid } = lastNameState;
  const { isValid: firstNameIsValid } = firstNameState;

  const startTimer = e => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(minutes + ':' + (seconds > 9 ? seconds : '0' + seconds));
    }
  };

  const clearTimer = e => {
    setTimer('10:00');
    if (Ref.current) clearInterval(Ref.current);
    const timer = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = timer;

    return () => {
      clearInterval(timer);
    };
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailIsValid && phoneIsValid && lastNameIsValid && firstNameIsValid
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, phoneIsValid, lastNameIsValid, firstNameIsValid]);

  const emailChangeHandler = event => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

    setFormIsValid(
      phoneState.isValid &&
        event.target.value.includes('@') &&
        firstNameState.isValid &&
        lastNameState.isValid
    );
  };

  const phoneChangeHandler = event => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);

    dispatchPhone({ type: 'USER_INPUT', val: formattedPhoneNumber });

    setFormIsValid(
      emailState.isValid &&
        formattedPhoneNumber.trim().length === 14 &&
        firstNameState.isValid &&
        lastNameState.isValid
    );
  };

  const firstNameChangeHandler = event => {
    dispatchFirstName({ type: 'USER_INPUT', val: event.target.value });

    setFormIsValid(
      emailState.isValid &&
        phoneState.isValid &&
        event.target.value.trim().length > 0 &&
        lastNameState.isValid
    );
  };

  const lastNameChangeHandler = event => {
    dispatchLastName({ type: 'USER_INPUT', val: event.target.value });

    setFormIsValid(
      emailState.isValid &&
        phoneState.isValid &&
        event.target.value.trim().length > 0 &&
        firstNameState.isValid
    );
  };

  const validatePhoneHandler = () => {
    dispatchPhone({ type: 'INPUT_BLUR' });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validateFirstNameHandler = () => {
    dispatchFirstName({ type: 'INPUT_BLUR' });
  };

  const validateLastNameHandler = () => {
    dispatchLastName({ type: 'INPUT_BLUR' });
  };

  const bookAppointment = () => {
    console.log('Booked');
  };

  const checkAvaibility = async () => {
    try {
      let skip = false;
      if (
        ctx.selectedTime.dateData &&
        Date.now() - ctx.selectedTime.lastAdd + 1000 < 10 * 60 * 1000
      ) {
        bookAppointment();
      } else {
        await axios
          .patch(
            `/date/check-availability/${ctx.selectedTime.dateData._id}?index=${ctx.selectedTime.index}`,
            {
              skip: skip
            }
          )
          .then(res => {
            if (res.data.data.isAvailable) {
              bookAppointment();
            } else {
              navigate('/date');
              ctx.setErrorText(
                'We apologize, the time you selected is no longer available. Please select another time.'
              );
              ctx.setError(true);
            }
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = event => {
    event.preventDefault();
    if (formIsValid) {
      checkAvaibility();
    }
  };

  return (
    <form
      className="appointment-content w-background-light input-group col col-sm-10 offset-sm-1 col-md-8 widget-reservation-contact"
      onSubmit={submitHandler}
    >
      <div className="widget-contact__header-section">
        <div className="widget-contact__title m-bottom--8">
          <h3 className="font--bold m-bottom--16">
            You're nearly done. Enter your information below.
          </h3>
          <p className="widget-contact__timer m-bottom--16 weight-500">
            {timer !== '0:00'
              ? `Appointment held for ${timer}`
              : 'This appointment is no longer being held'}
          </p>
        </div>
      </div>
      <div className="widget-contact__section m-bottom--48">
        <div className="row m-bottom--8">
          <div className="col col-6-sm contact-field--small-padding-right">
            <div className="ember-view client-phone">
              <input
                placeholder="Mobile phone"
                autoComplete="tel"
                type="tel"
                className="ember-view ember-text-field input-group__input input l-fill input-phone"
                autoCapitalize="off"
                value={phoneState.value}
                onChange={phoneChangeHandler}
                onBlur={validatePhoneHandler}
              ></input>
            </div>
          </div>
          <div className="col col-6-sm contact-field--small-padding-left">
            <input
              placeholder="Email"
              autoComplete="email"
              type="email"
              className="ember-view ember-text-field input-group__input input l-fill client-email"
              autoCapitalize="off"
              value={emailState.value}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            ></input>
          </div>
        </div>
        <div className="row m-bottom--8">
          <div className="col col-6-sm contact-field--small-padding-right">
            <input
              placeholder="First name"
              autoComplete="given-name"
              type="text"
              className="ember-view ember-text-field input l-fill input-group__input client-first-name l-fill"
              value={firstNameState.value}
              onChange={firstNameChangeHandler}
              onBlur={validateFirstNameHandler}
            ></input>
          </div>
          <div className="col col-6-sm contact-field--small-padding-left">
            <input
              placeholder="Last name"
              autoComplete="family-name"
              type="text"
              className="ember-view ember-text-field input l-fill input-group__input client-last-name l-fill"
              value={lastNameState.value}
              onChange={lastNameChangeHandler}
              onBlur={validateLastNameHandler}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <textarea
              maxLength="255"
              placeholder="Appointment notes (optional)"
              className="ember-view ember-text-area input input-textarea l-fill textarea-group__textarea buyer-note"
              spellCheck="false"
            ></textarea>
          </div>
        </div>
      </div>
      <div className="border-bottom"></div>
      <div className="m-bottom--32">
        <p className="widget-contact__new-account-explnation m-top--24">
          Upon booking, we will automatically create an account for you with
          Square Appointments. You can sign back into ... using your mobile
          number at any time.
        </p>
      </div>
      <button
        type="submit"
        disabled={!formIsValid}
        className="w-button w-button--primary w-button--large w-button--rounded l-fill widget-book-appointment-button ember-view button button--loading"
      >
        Book appointment
      </button>
      <p className="widget-reservation-contact__consent-message m-top--16">
        By creating this appointment, you acknowledge you will receive automated
        transactional messages from this merchant.
      </p>
    </form>
  );
}

const formatPhoneNumber = value => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }

  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
};

const getTimeRemaining = e => {
  const total = Date.parse(e) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / 1000 / 60 / 60) % 24);
  return {
    total,
    hours,
    minutes,
    seconds
  };
};

const getDeadTime = () => {
  let deadline = new Date();

  deadline.setSeconds(deadline.getSeconds() + 600);
  return deadline;
};

export default ReservationForm;
