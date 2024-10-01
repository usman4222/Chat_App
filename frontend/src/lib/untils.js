import animationData from "../assets/animation.json"


export const animationDefaultOption = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
}

export const cn = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };