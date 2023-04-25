import * as COMPONENT from '../components';
import * as SVG from '../configs/svgs';
import { ReactNode } from 'react';
import Modal from 'react-modal';
import clsx from 'classnames';

type PropsTypes = {
  isOpen: boolean;
  setIsOpen: any;
  header?: string;
  className?: string;
  children: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: (e?: any) => void;
};

Modal.setAppElement('#root');

export default function Component({
  isOpen,
  setIsOpen,
  header,
  className,
  children,
  isLoading,
  disabled,
  onClick,
}: PropsTypes) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={setIsOpen}
      style={{
        content: {
          height: 'max-content',
          maxHeight: '80%',
          borderRadius: '12px',
          padding: 0,
          margin: 'auto',
          overflow: 'auto',
        },
      }}
      closeTimeoutMS={400}
    >
      <div className={clsx('modal', className)}>
        {(header && (
          <div className='modal-header'>
            <h2 className='text-lg font-semibold mr-2'>{header}</h2>
            <SVG.IC_CLOSE className='cursor-pointer' onClick={() => setIsOpen()} />
          </div>
        )) ||
          null}
        <div className='modal-body'>{children}</div>
        {(onClick && (
          <div className='modal-footer'>
            <COMPONENT.Button
              type='primary'
              icon={<SVG.IC_PLUS />}
              label='Simpan'
              isLoading={isLoading}
              disabled={disabled}
              onClick={onClick}
            />
          </div>
        )) ||
          null}
      </div>
    </Modal>
  );
}
