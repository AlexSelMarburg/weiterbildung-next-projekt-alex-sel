"use client";

import { useFormState } from "react-dom";
import { formToggleBookmark } from "@/utils/dbActions";
import SubmitButton from "./SubmitButton";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const initialState = {
  message: "",
  status: 0,
};

type Props = {
  userEmail: string;
  movieID: number;
};

export default function SetBookMarkForm({ userEmail, movieID }: Props) {
  const [state, formAction] = useFormState(formToggleBookmark, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 200) {
      toast.success(state.message);
      formRef.current?.reset();
    }

    if (state.status === 500) {
      toast.error(state.message);
    }
  }, [state.status, state.message]);

  return (
    <form action={formAction} ref={formRef}>
      <input type="hidden" name="movieID" value={movieID} />
      <input type="hidden" name="userEmail" value={userEmail} />
      <SubmitButton
        pendingContent="Warten…"
        readyContent="Lesezeichen setzen"
      />
    </form>
  );
}
