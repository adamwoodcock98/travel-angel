import React, {useState} from "react";
import "./welcome.scss";
import { Signup } from "../authentication/authentication";
import axios from 'axios'
const slides = [
  {
    title: "Travel",
    subtitle: "Angel",
    description: "Your trip guardian",
    image: "/slides/slide-3.png",
  },
  {
    title: "Store Your",
    subtitle: "Details",
    description: "In a safe & secure environment",
    image: "/slides/slide-4.png",
  },
  {
    title: "Find",
    subtitle: "Your Flight",
    description: "Without having to input the details manually",
    image: "/slides/slide-1.png",
  },
  {
    title: "Upload &",
    subtitle: "Download",
    description: "Your documents, plane tickets and booking confirmations",
    image: "/slides/slide-5.png",
  },
  {
    title: "Plan Your",
    subtitle: "Holidays",
    description: "Have everything you need in one place",
    image: "/slides/slide-2.png",
  },
];

function useTilt(active) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current || !active) {
      return;
    }

    const state = {
      rect: undefined,
      mouseX: undefined,
      mouseY: undefined,
    };

    let el = ref.current;

    const handleMouseMove = (e) => {
      if (!el) {
        return;
      }
      if (!state.rect) {
        state.rect = el.getBoundingClientRect();
      }
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      const px = (state.mouseX - state.rect.left) / state.rect.width;
      const py = (state.mouseY - state.rect.top) / state.rect.height;

      el.style.setProperty("--px", px);
      el.style.setProperty("--py", py);
    };

    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);

  return ref;
}

const initialState = {
  slideIndex: 0,
};

const slidesReducer = (state, event) => {
  if (event.type === "NEXT") {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % slides.length,
    };
  }
  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1,
    };
  }
};

function Slide({ slide, offset }) {
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);

  return (
    <div
      ref={ref}
      className="slide"
      data-active={active}
      style={{
        "--offset": offset,
        "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
      }}
    >
      <div
        className="slideBackground"
        style={{
          backgroundImage: `url('${slide.image}')`,
        }}
      />
      <div
        className="slideContent"
        style={{
          backgroundImage: `url('${slide.image}')`,
        }}
      >
        <div className="slideContentInner">
          <h2 className="slideTitle">{slide.title}</h2>
          <h3 className="slideSubtitle">{slide.subtitle}</h3>
          <p className="slideDescription">{slide.description}</p>
        </div>
      </div>
    </div>
  );
}

export const Welcome = (handleClick) => {
  const [state, dispatch] = React.useReducer(slidesReducer, initialState);
  const url = "http://localhost:8000";
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = user;
    const newUser = { firstName, lastName, email, password };

    await axios.post(`${url}/user/sign-up`, newUser).then((res) => {
      handleClose();
    });
  };
  return (
    <div id="welcome-container">
      <div id="welcome-slide-show">
        <div className="slides">
          <button
            className="slides-btn"
            onClick={() => dispatch({ type: "NEXT" })}
          >
            ‹
          </button>

          {[...slides, ...slides, ...slides].map((slide, i) => {
            let offset = slides.length + (state.slideIndex - i);
            return <Slide slide={slide} offset={offset} key={i} />;
          })}
          <button
            className="slides-btn"
            onClick={() => dispatch({ type: "PREV" })}
          >
            ›
          </button>
        </div>
      </div>
      <div id="get-started">
        <button id="get-started-btn">
          <Signup 
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          handleChange={handleChange}
          user={user}
          handleSubmit={handleSubmit}
          />
        </button>
      </div>
    </div>
  );
};
