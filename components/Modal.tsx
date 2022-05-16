import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'
type ModalProps = {
    title: string
    description?: string
    children?: React.ReactNode
    icon?: (props: any) => JSX.Element
    isOpen?: boolean
}
const Modal = ({ title, description, children, ...rest }: ModalProps) => {
    const isOpen = rest.isOpen ?? false;
    const [open, setOpen] = useState(isOpen)

    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => { }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                                <div className="grid sm:grid-cols-2 xs:grid-cols-1">
                                    <div id="left" className="xs:hidden sm:fixed sm:top-0 sm:left-0 sm:bottom-0 sm:w-1/3 sm:bg-indigo-600">
                                    </div>
                                    <div id="right" className="sm:sticky xs:left-40 sm:left-48 w-full">
                                        <div>
                                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                                {rest?.icon ? (<rest.icon className="h-6 w-6 text-green-600" aria-hidden="true" />) : (<CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />)}
                                            </div>
                                            <div className="mt-3 text-center sm:mt-5">
                                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                    {title}
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    {description ? (
                                                        <p className="text-sm text-gray-500">
                                                            {description}
                                                        </p>
                                                    ) : (
                                                        <>{children}</>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                            <button
                                                type="button"
                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                                                onClick={() => setOpen(false)}
                                            >
                                                Deactivate
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                                onClick={() => setOpen(false)}
                                                ref={cancelButtonRef}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>)
}

export default Modal