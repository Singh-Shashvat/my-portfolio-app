---
name: add-form
description: Use when building or fixing any form in FinPlan Admin — "add a form", "add a create/edit modal", "add validation", "form doesn't validate", "edit modal shows stale values", "submit fires twice". Covers the Formik + Zod + zod-formik-adapter pattern, Custom* field binding, and edit-mode value syncing. This project uses Formik, not react-hook-form.
---

# Add a form

**Formik + Zod via `zod-formik-adapter`.** `react-hook-form` is in `package.json` but has zero
usages — do not use it.

Reference: `src/modules/schemes/components/NewSchemeModal.tsx`.

## 1. Schema in `<feature>.validation.ts`

```ts
import { z } from "zod";

export const schemeFormSchema = z.object({
  schemeCode: z.string().min(1, "Scheme code is required"),
  totalLoanParts: z.number().int().positive("Must be greater than 0"),
  interestRatePercent: z.number().min(0, "Cannot be negative"),
});

export type SchemeFormValues = z.infer<typeof schemeFormSchema>;
```

Always export the inferred type and use it as `useFormik<T>`'s generic — that is what keeps
`values`, `errors`, and `touched` typed. Write real messages; they are what the user reads.

## 2. Wire Formik

```tsx
const formik = useFormik<SchemeFormValues>({
  initialValues: {
    schemeCode: "",
    totalLoanParts: 8,
    interestRatePercent: 0,
  },
  validationSchema: toFormikValidationSchema(schemeFormSchema),
  onSubmit: async (values) => {
    if (isEditMode && schemeToEdit) {
      await updateScheme({ id: schemeToEdit.id, data: values });
    } else {
      await createScheme(values);
    }
    onOpenChange(false);
  },
});
```

## 3. Bind fields to `Custom*` inputs

Never a raw `<input>`. Use `CustomInput`, `CustomSelect`, `CustomDatePicker`, `CustomTextarea`,
`CustomCheckbox`, `CustomSwitch`, `CustomPhoneNumberInput`, `CustomFileUpload`, `CustomOtpInput`.

```tsx
<CustomInput
  name="schemeCode"
  label="Scheme code"
  value={formik.values.schemeCode}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={formik.touched.schemeCode && formik.errors.schemeCode}
/>
```

Check the component's own props before assuming this signature — some `Custom*` inputs take
`onChange(value)` rather than an event, in which case use `formik.setFieldValue`.

**Show errors only after touch** (`touched.x && errors.x`). Validating an untouched form is hostile.

Numeric fields come back from inputs as strings — coerce with `Number(...)` before sending, as the
reference file does, or use `z.coerce.number()` in the schema.

## 4. Edit mode

One modal handles create and edit. Sync values when it opens:

```tsx
const isEditMode = !!schemeToEdit;

useEffect(() => {
  if (open) {
    if (isEditMode && schemeToEdit) {
      formik.setValues({
        schemeCode: schemeToEdit.schemeCode,
        totalLoanParts: schemeToEdit.totalLoanParts,
        interestRatePercent: schemeToEdit.interestRatePercent,
      });
    } else {
      formik.resetForm();
    }
  }
}, [open, schemeToEdit]);
```

Forgetting the `else`-reset is why a create modal opens pre-filled with the last edited record.

## 5. Submit state

```tsx
<CustomButton
  type="submit"
  disabled={formik.isSubmitting || isPending}
  isLoading={formik.isSubmitting || isPending}
>
  {isEditMode ? "Update" : "Create"}
</CustomButton>
```

Disabled while pending prevents the double-submit. Keep the button in place and swap its
label/spinner — don't re-layout the form.

## 6. Feedback

Mutations don't toast; the component does:

```tsx
try {
  await createScheme(values);
  toast.success("Scheme created");
  onOpenChange(false);
} catch (error) {
  toast.error(getMessageFromError(error));
}
```

`getMessageFromError` is the only place errors get normalised for display — never read
`error.message` directly. The axios interceptor already toasts 5xx, so don't double-toast those.

## Before you're done

- [ ] Zod schema + inferred type in `<feature>.validation.ts`
- [ ] `useFormik<T>` typed with that inferred type
- [ ] Fields bound to `Custom*` components, errors gated on `touched`
- [ ] Edit mode syncs values on open; create mode resets
- [ ] Submit disabled while pending
- [ ] Success and failure both toast; failures go through `getMessageFromError`
- [ ] `yarn lint` and `yarn build` pass
