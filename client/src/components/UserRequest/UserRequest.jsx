import React from 'react';
import { Box, Input, FormControl, FormLabel, Button, Select } from '@chakra-ui/react';
import { FaFilePdf, FaPrint } from 'react-icons/fa'; // Importer les icônes

function UserRequest() {
    return (
        <Box className="user-request-form">
            <FormControl id="nom">
                <FormLabel>Nom</FormLabel>
                <Input type="text" />
            </FormControl>
            <FormControl id="prenom">
                <FormLabel>Prénom</FormLabel>
                <Input type="text" />
            </FormControl>
            <FormControl id="numero">
                <FormLabel>Numéro de téléphone</FormLabel>
                <Input type="tel" />
            </FormControl>
            <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input type="email" />
            </FormControl>
            <FormControl id="wilaya">
                <FormLabel>Wilaya</FormLabel>
                <Select placeholder="Sélectionner">
                    <option value="wilaya1">Wilaya 1</option>
                    <option value="wilaya2">Wilaya 2</option>
                    <option value="wilaya3">Wilaya 3</option>
                    {/* Ajoutez d'autres options si nécessaire */}
                </Select>
            </FormControl>
            <FormControl id="estimationCout">
                <FormLabel>Estimation de coût</FormLabel>
                <Input type="number" />
            </FormControl>
            <FormControl id="estimationDuree">
                <FormLabel>Estimation de durée</FormLabel>
                <Input type="text" />
            </FormControl>
            <Button leftIcon={<FaFilePdf />} colorScheme="blue" mt={4} mr={2}>
                Télécharger PDF
            </Button>
            <Button leftIcon={<FaPrint />} colorScheme="blue" mt={4}>
                Imprimer
            </Button>
            <Button colorScheme="blue" mt={4}>
                envyer
            </Button>
        </Box>
    );
}

export default UserRequest;
