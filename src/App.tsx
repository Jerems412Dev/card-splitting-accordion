import { ChevronDown, Gauge, Layers2, MousePointerClick, Pointer, Send } from 'lucide-react';
import './App.css';
import { useState } from 'react';
import { motion } from 'motion/react';

function App() {
  const [listDiv, setListDiv] = useState([
    {
      title: 'What is Interaction Design?',
      description: 'Designing how users interact with digital interfaces with intuitive experiences.',
      icon: MousePointerClick,
      isOpen: false
    },
    {
      title: 'Principles & Patterns',
      description: 'Fundamental guidelines and repeated solutions that ensure consistency and usability in design.',
      icon: Layers2,
      isOpen: false
    },
    {
      title: 'Usability & Accessibility',
      description: 'Focus on making digital design easy to use and accessible for everyone, including those with disabilities.',
      icon: Pointer,
      isOpen: false
    },
    {
      title: 'Prototyping & Testing',
      description: 'Designing how users interact with digital interfaces with intuitive experiences.',
      icon: Send,
      isOpen: false
    },
    {
      title: 'UX Optimization',
      description: 'Improving the overall user experience by enhancing usability and satisfaction.',
      icon: Gauge,
      isOpen: false
    }
  ]);

  const [open, setOpen] = useState(false);
  const [divOpenIndex, setDivOpenIndex] = useState(-1);

  const handleOpen = (index: number) => () => {
    const newListDiv = listDiv.map((div, i) => {
      if (i === index) {
        return {
          ...div,
          isOpen: !div.isOpen
        }
      }
      return {
        ...div,
        isOpen: false
      }
    });
    setListDiv(newListDiv);
    setOpen(newListDiv[index].isOpen);
    setDivOpenIndex(index);
  };

  const openCloseAnimate = {
    open: {
      opacity: 1,
      y: 0,
      height: 'fit-content',
      transition: { 
        duration: 0.6,
        type: 'spring',
        bounce: 0.6,
        scaleY: { duration: 0.1 },
      }
    },
    close: {
      opacity: 0,
      y: -30,
      height: 0,
      transition: { 
        duration: 0.1
      }
    }
  };

  const openCloseParentDivAnimate = {
    open: {
      height: 'fit-content',
      transition: { 
        duration: 0.6,
        type: 'spring',
        bounce: 0.6,
      }
    },
    close: {
      height: 'fit-content',
      transition: { 
        duration: 0.1,
        type: 'spring',
        bounce: 0.5
      }
    }
  };

  const renderDivs = (divs: typeof listDiv, startIndex: number) => (
    divs.map((div, index) => (
      <motion.div 
        key={index + (startIndex < 0 ? 0 : startIndex)}
        onClick={handleOpen(index + (startIndex < 0 ? 0 : startIndex))}
        initial={{ height: 'fit-content' }}
        animate={div.isOpen ? openCloseParentDivAnimate.open : openCloseParentDivAnimate.close}
        className={"w-full flex flex-col items-center justify-center p-4 rounded-3xl cursor-pointer hover:bg-[#f7f6fb] gap-y-1" + (div.isOpen && " bg-[#f7f6fb] border-1 border-[#aeaeb6] w-[30%]")}>
        <div className="w-full flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-start p-0 gap-x-2">
            <div.icon  size={28} className="text-[#84838b]" />
            <p className="font-[570] text-xl text-[#242427] tracking-tight">{div.title}</p>
          </div>
          <ChevronDown 
            className={"text-[#aeaeb6]" + (div.isOpen ? " rotate-chevron" : " rotate-chevron-normal")} 
            size={28}
          />
        </div>
        <motion.div 
          className="w-full flex flex-row text-[#59595e] text-[1.150rem] overflow-hidden"
        >
          <motion.div
            className="w-full flex flex-row"
            initial={{ y: -30, height: 0, opacity: 0 }}
            animate={div.isOpen ? openCloseAnimate.open : openCloseAnimate.close}
          >
            {div.description}
          </motion.div>
        </motion.div>
      </motion.div>
    ))
  );

  return (
    <>
      <div className="w-full h-screen flex flex-row items-center justify-center bg-[#fefefe] p-1">
        <div 
          className={"sm:w-[60%] md:w-[50%] lg:w-[30%] xl:[30%] w-[95%] h-fit flex flex-col rounded-3xl" + (open ? " bg-transparent border-0" : " border-1 border-[#aeaeb6] bg-[#fefefe]")}
        >
          {divOpenIndex !== -1 ?
            <div 
              className="w-full h-fit flex flex-col rounded-3xl bg-transparent border-none gap-y-3"
            >
              <div 
                className={"w-full h-fit flex flex-col rounded-3xl" + (open && divOpenIndex !== 0 ? " border-1 border-[#aeaeb6] bg-[#fefefe]" : " border-none bg-transparent")}
              >
                {renderDivs(listDiv.slice(0, divOpenIndex), 0)}
              </div>
              <div 
                className={"w-full h-fit flex flex-col rounded-3xl" + (open ? " border-1 border-[#aeaeb6] bg-[#fefefe]" : " border-none bg-transparent")}
              >
                {renderDivs(listDiv.slice(divOpenIndex, divOpenIndex + 1), divOpenIndex)}
              </div>
              <div 
                className={"w-full h-fit flex flex-col rounded-3xl" + (open && divOpenIndex !== listDiv.length-1 ? " border-1 border-[#aeaeb6] bg-[#fefefe]" : " border-none bg-transparent")}
              >
                {renderDivs(listDiv.slice(divOpenIndex + 1, listDiv.length), divOpenIndex + 1)}
              </div>
            </div>
          : 
            renderDivs(listDiv.slice(0, listDiv.length), 0)
          }
        </div>
      </div>
    </>
  )
}

export default App
