import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { profileFormSchema, type ProfileFormValues } from '../../shemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomLabel } from '~/components/shared/text/customLabel';
import { Loader2, UserIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatFullName, parseFullName } from '~/utils/common-utils';
import { Button } from '~/components/ui/button';
import { useEffect, useState } from 'react';
import { useUpdateFullName } from '~/hooks/account/useUpdateFullName';

interface UpdateFullNameFormProps {
  firstName?: string;
  lastName?: string;
}

export function UpdateFullNameForm({
  firstName,
  lastName,
}: UpdateFullNameFormProps) {
  const { t } = useTranslation(['account']);
  const [editFullName, setEditFullName] = useState(false);
  const { mutate: updateFullName, isPending } = useUpdateFullName();
  const defaultFullName = formatFullName(firstName, lastName);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: defaultFullName,
    },
    mode: 'onChange', // để validate realtime
  });

  const {
    formState: { isDirty, isValid },
  } = form;

  useEffect(() => {
    form.reset({
      fullName: defaultFullName,
    });
  }, [firstName, lastName, form, defaultFullName]);

  function onSubmit(data: ProfileFormValues) {
    console.log('Dữ liệu gửi đi:', data);
    const { firstName: newFirstName, lastName: newLastName } = parseFullName(
      data.fullName,
    );
    updateFullName(
      { firstName: newFirstName, lastName: newLastName },
      {
        onSuccess: () => {
          // Closing form and reset dirty state after API success
          setEditFullName(false);
          form.reset(data);
        },
      },
    );
  }
  function handleCancel() {
    setEditFullName(false);
    form.reset({ fullName: defaultFullName }); // return to original full name
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <CustomLabel
                className='uppercase'
                text={t('account:detail.fullname')}
                icon={<UserIcon className='size-4' />}
              />
              <FormControl>
                <Input
                  disabled={!editFullName}
                  placeholder={formatFullName(firstName, lastName)}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Nút edit */}
        {!editFullName && (
          <Button
            type='button'
            variant='outline'
            onClick={() => setEditFullName(true)}>
            Edit
          </Button>
        )}

        {/* Trạng thái sửa: Hiện nút Update và Cancel */}
        {editFullName && (
          <div className='flex gap-3'>
            <Button
              type='submit'
              // Khóa nút nếu form không hợp lệ, chưa chỉnh sửa gì, hoặc đang load API
              disabled={!isDirty || !isValid || isPending}>
              {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              {t('account:detail.update')}
            </Button>

            <Button
              variant='destructive'
              onClick={handleCancel}
              disabled={isPending}>
              {t('account:detail.cancelAccount.cancelBtn')}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
