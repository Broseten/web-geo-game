import { Checkbox, CheckboxGroup, VStack } from "@chakra-ui/react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { global_roles } from "../../data/data";

const RoleSelector = forwardRef((_, ref) => {
   // Initialize checked roles with the first 'maxPlayers' roles selected
   const [checkedRoles, setCheckedRoles] = useState<Record<string, boolean>>(() => {
      const initialRoles: Record<string, boolean> = {};
      global_roles.forEach((role, index) => {
         initialRoles[role] = index < 4; // Preselect 4 roles
      });
      return initialRoles;
   });

   // Filter selected roles as a string array
   const selectedRoles: string[] = Object.keys(checkedRoles).filter((role) => checkedRoles[role]);

   // Toggle a role
   const toggleRole = (role: string) => {
      setCheckedRoles((prev) => {
         const newCheckedRoles = { ...prev };
         const isCurrentlySelected = newCheckedRoles[role];

         newCheckedRoles[role] = !isCurrentlySelected;

         return newCheckedRoles;
      });
   };

   // Expose selectedRoles to the parent component via ref
   useImperativeHandle(ref, () => ({
      getSelectedRoles: () => selectedRoles,
   }));

   return (
      <CheckboxGroup colorScheme="orange">
         <VStack align="left" gap="0">
            {global_roles.map((role) => (
               <Checkbox
                  key={role}
                  borderColor="orange"
                  color="gray.900"
                  isChecked={checkedRoles[role]}
                  onChange={() => toggleRole(role)}
               >
                  {role}
               </Checkbox>
            ))}
         </VStack>
      </CheckboxGroup>
   );
});

export default RoleSelector;
