import React, { ReactNode, createContext, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export interface IModalControllerContext {
  currentModal?: ReactNode
  setCurrentModal: (modal: ReactNode) => void
  closeModal: () => void
}

export const ModalControllerContext = createContext<IModalControllerContext>({
  //
  setCurrentModal: () => {},
  closeModal: () => {},
})

const ModalControllerProvider: React.FC = ({ children }) => {
  const [currentModal, setCurrentModal] = useState<ReactNode>()

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCurrentModal(undefined)
    }

    if (currentModal) document.addEventListener('keydown', onKeydown)
    else document.removeEventListener('keydown', onKeydown)

    return () => {
      document.removeEventListener('keydown', onKeydown)
    }
  }, [currentModal])

  return (
    <ModalControllerContext.Provider
      value={{
        currentModal,
        setCurrentModal,
        closeModal: () => setCurrentModal(undefined),
      }}
    >
      {children}

      <motion.div
        className="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 z-40 flex justify-center items-center"
        initial={{ opacity: 0 }}
        style={{
          //
          // visibility: currentModal ? 'visible' : 'hidden',
          pointerEvents: currentModal ? 'auto' : 'none',
        }}
        animate={currentModal ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.1 }}
        onClick={e => {
          if (e.target === e.currentTarget) {
            setCurrentModal(undefined)
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: currentModal ? 1 : 0.8 }}
          transition={{ duration: 0.15 }}
        >
          {currentModal}
        </motion.div>
      </motion.div>
    </ModalControllerContext.Provider>
  )
}

export default ModalControllerProvider
