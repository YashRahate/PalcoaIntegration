import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LogoutWarning() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const redirectToLoginPage = () => {
    navigate("/");
  };
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  return (
    <Dialog open={!token}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>You are logged out</DialogTitle>
          <DialogDescription>
            Please login to continue your process
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" onClick={redirectToLoginPage}>
            Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
