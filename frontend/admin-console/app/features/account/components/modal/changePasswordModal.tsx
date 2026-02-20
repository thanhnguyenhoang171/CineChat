import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { ChangePasswordForm } from '../form/changePasswordForm';

interface ChangePasswordModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export function ChangePasswordModal({
  open,
  setOpen,
}: ChangePasswordModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* modal */}
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Đổi mật khẩu</DialogTitle>
        </DialogHeader>

        <ChangePasswordForm
          onSuccess={() => setOpen(false)} // submit xong auto đóng
        />
      </DialogContent>
    </Dialog>
  );
}
