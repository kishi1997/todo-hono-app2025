"use client";
import { useGetProfile } from "@/features/profile/api/use-get-profile";
import React from "react";

export const Header = () => {
  const { data, isLoading } = useGetProfile();
  if (isLoading) {
    return (
      <div className="w-full mt-72 flex justify-center items-center">
        loading...
      </div>
    );
  }
  if (!data) {
    return (
      <div className="w-full mt-64 flex justify-center items-center">
        dataが見つかりません
      </div>
    );
  }
  return (
    <div className="flex justify-end items-center p-4">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <span className="mt-2">{data.user.name}</span>
      </div>
    </div>
  );
};
