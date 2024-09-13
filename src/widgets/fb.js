// import React from 'react';
// import { ReactFormBuilder } from 'react-form-builder2';
// import 'react-form-builder2/dist/app.css';

// const FormBuilderComponent = () => {
//   const formData = [
//     {
//       id: 'A1',
//       element: 'TextInput',
//       text: 'Your Name',
//     },
//     {
//       id: 'A2',
//       element: 'TextArea',
//       text: 'Description',
//     },
//   ];

//   return (
//     <div>
//       <h2>Form Builder Demo</h2>
//       <ReactFormBuilder
//         data={formData} // Add sample data here
//       />
//     </div>
//   );
// };

// export default FormBuilderComponent;

// import React from 'react';
// import { useForm } from 'react-hook-form';

// export default function FormBuilderComponent() {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const onSubmit = data => console.log(data);
//   console.log(errors);
  
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input type="text" placeholder="First name" {...register("First name", {required: true, maxLength: 80})} />
//       <input type="text" placeholder="Last name" {...register("Last name", {required: true, maxLength: 100})} />
//       <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
//       <input type="tel" placeholder="Mobile number" {...register("Mobile number", {required: true, minLength: 6, maxLength: 12})} />
//       <select {...register("Title", { required: true })}>
//         <option value="Mr">Mr</option>
//         <option value="Mrs">Mrs</option>
//         <option value="Miss">Miss</option>
//         <option value="Dr">Dr</option>
//       </select>

//       <input {...register("Developer", { required: true })} type="radio" value="Yes" />
//       <input {...register("Developer", { required: true })} type="radio" value="No" />
//       <input type="text" placeholder="Name" {...register} />

//       <input type="submit" />
//     </form>
//   );
// }

import React from 'react';
import { useForm } from 'react-hook-form';

const FormBuilder = ({ fields }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={index}>
          <label>{field.label}</label>
          {field.type === 'text' && <input {...register(field.name)} />}
          {field.type === 'textarea' && <textarea {...register(field.name)} />}
          {field.type === 'select' && (
            <select {...register(field.name)}>
              {field.options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

// Usage
const fields = [
  { label: 'Name', name: 'name', type: 'text' },
  { label: 'Description', name: 'description', type: 'textarea' },
  {
    label: 'Category',
    name: 'category',
    type: 'select',
    options: ['Category 1', 'Category 2'],
  },
];

const FormBuilderComponent = () => <FormBuilder fields={fields} />;

export default FormBuilderComponent;
