// components/UserForm.tsx
import React from "react";
import { useUserForm } from "../hooks/useUserForm";
import { useUserStore } from "@/state/userStore";
import { useUserMutation } from "@/hooks/useUserMutation";
import { AgeOptions, UserFormData } from "@/app/types"

const ageOptions: AgeOptions[] = [
  { value: 18, label: "18" },
  { value: 25, label: "25" },
  { value: 30, label: "30" },
  { value: 40, label: "40" },
];

const skillsOptions = ["JavaScript", "Python", "Java", "C++", "Ruby"];

const UserForm: React.FC = () => {
  const { register, handleSubmit, errors, onSubmit, reset } = useUserForm();
  const { addUser } = useUserStore();
  const { mutate } = useUserMutation();

  const onFormSubmit = async (data: UserFormData) => {
    try {
      const response = await mutate(data); // API call
      if (response) {
        addUser(data); // Store to Zustand
        reset(); // Reset form after submission
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div>
        <label>First Name</label>
        <input {...register("firstName")} />
        {errors.firstName && <span>{errors.firstName.message}</span>}
      </div>

      <div>
        <label>Last Name</label>
        <input {...register("lastName")} />
        {errors.lastName && <span>{errors.lastName.message}</span>}
      </div>

      <div>
        <label>Age</label>
        <select {...register("age")}>
          {ageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.age && <span>{errors.age.message}</span>}
      </div>

      <div>
        <label>Sex</label>
        <div>
          <label>
            <input type="radio" {...register("sex")} value="male" /> Male
          </label>
          <label>
            <input type="radio" {...register("sex")} value="female" /> Female
          </label>
          <label>
            <input type="radio" {...register("sex")} value="other" /> Other
          </label>
        </div>
        {errors.sex && <span>{errors.sex.message}</span>}
      </div>

      <div>
        <label>Skills</label>
        <div>
          {skillsOptions.map((skill) => (
            <label key={skill}>
              <input type="checkbox" value={skill} {...register("skills")} /> {skill}
            </label>
          ))}
        </div>
        {errors.skills && <span>{errors.skills.message}</span>}
      </div>

      <div>
        <label>
          <input type="checkbox" {...register("agreeTerms")} />
          I agree to the terms
        </label>
        {errors.agreeTerms && <span>{errors.agreeTerms.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
