import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import { CustomLabel } from '../text/customLabel';
import { TriangleAlert } from 'lucide-react';

interface AppAlertDialogProps {
  variantConfirmBtn:
    | 'default'
    | 'link'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost';
  title: string;
  description: string;
  onConfirm: () => void;
  setOpenAlertDialog: (openAlertDialog: boolean) => void;
  openAlertDialog: boolean;
  cancelText?: string;
  confirmText?: string;
  icon?: React.ReactNode;
}

export function AppAlertDialog({
  variantConfirmBtn = 'default',
  title,
  openAlertDialog = false,
  description,
  onConfirm,
  setOpenAlertDialog,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  icon,
}: AppAlertDialogProps) {
  return (
    <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            <CustomLabel text={description} icon={icon} key={'alert_id'} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpenAlertDialog(false)}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} variant={variantConfirmBtn}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
