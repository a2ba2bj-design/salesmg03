'use client'
export const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
      if(typeof window !== 'undefined')
         window.location.hash = `#${id}`  ;
    }
  };