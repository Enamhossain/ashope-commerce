import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Divider,
  Flex,
  Heading,
  Icon,
  Input,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Stack,
  Text,
  useDisclosure,
  VStack,
  HStack,
  Radio,
  RadioGroup
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon,  FilterIcon, SidebarCloseIcon } from 'lucide-react';
import { useProductStore } from '../../store/productStore';


const FilterSidebar = () => {
  // Get store values and actions
  const { 
    filters, 
    setFilters, 
    applyFilters, 
    resetFilters,
    isLoading
  } = useProductStore();
  
  // Mobile sidebar state
  const { isOpen, onToggle, onClose } = useDisclosure();
  
  // Available filters - these would be fetched from API in a real app
  const [availableFilters, setAvailableFilters] = useState({
    categories: [],
    subcategories: {},
    nestedSubcategories: {},
    sizes: [],
    fabrics: [],
    fits: [],
    patterns: [],
    colors: []
  });

  // Fetch available filters on component mount
  useEffect(() => {
    // This would be an API call in a real app
    // For now, we'll simulate with dummy data
    const fetchAvailableFilters = async () => {
      // Simulating API response
      setAvailableFilters({
        categories: ['Clothing', 'Footwear', 'Accessories'],
        subcategories: {
          'Clothing': ['Men', 'Women', 'Kids'],
          'Footwear': ['Casual', 'Sports', 'Formal'],
          'Accessories': ['Bags', 'Watches', 'Jewelry']
        },
        nestedSubcategories: {
          'Men': ['Shirts', 'Pants', 'T-shirts'],
          'Women': ['Dresses', 'Tops', 'Skirts'],
          'Kids': ['Boys', 'Girls', 'Infants']
        },
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        fabrics: ['Cotton', 'Linen', 'Silk', 'Wool', 'Polyester', 'Denim'],
        fits: ['Regular', 'Slim', 'Relaxed', 'Oversized'],
        patterns: ['Solid', 'Striped', 'Checkered', 'Printed', 'Floral'],
        colors: ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink', 'Orange', 'Brown']
      });
    };
    
    fetchAvailableFilters();
  }, []);
  
  // Local state for filter values (to avoid immediate API calls on every change)
  const [localFilters, setLocalFilters] = useState(filters);
  
  // Update local filters when store filters change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Filter section collapse states
  const categoryDisclosure = useDisclosure({ defaultIsOpen: true });
  const sizeDisclosure = useDisclosure({ defaultIsOpen: true });
  const fabricDisclosure = useDisclosure({ defaultIsOpen: true });
  const fitDisclosure = useDisclosure({ defaultIsOpen: true });
  const patternDisclosure = useDisclosure({ defaultIsOpen: true });
  const colorDisclosure = useDisclosure({ defaultIsOpen: true });
  const priceDisclosure = useDisclosure({ defaultIsOpen: true });

  // Update local filter state
  const updateLocalFilter = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle checkbox toggle for array filters (size, fabrics, colors)
  const handleArrayFilterToggle = (item, filterKey) => {
    const currentArray = [...(localFilters[filterKey] || [])];
    
    if (currentArray.includes(item)) {
      updateLocalFilter(filterKey, currentArray.filter(i => i !== item));
    } else {
      updateLocalFilter(filterKey, [...currentArray, item]);
    }
  };

  // Apply filters
  const handleApplyFilters = () => {
    setFilters(localFilters);
    applyFilters(); // Use the new applyFilters action
    onClose(); // Close mobile sidebar
  };

  // Get relevant subcategories based on selected category
  const getRelevantSubcategories = () => {
    if (!localFilters.category || !availableFilters.subcategories) return [];
    return availableFilters.subcategories[localFilters.category] || [];
  };

  // Get relevant nested subcategories based on selected subcategory
  const getRelevantNestedSubcategories = () => {
    if (!localFilters.subcategory || !availableFilters.nestedSubcategories) return [];
    return availableFilters.nestedSubcategories[localFilters.subcategory] || [];
  };

  // Filter section component
  const FilterSection = ({ title, isOpen, onToggle, children }) => (
    <Box mb={4}>
      <Flex 
        justify="space-between" 
        align="center" 
        cursor="pointer" 
        onClick={onToggle}
        mb={2}
      >
        <Text fontWeight="semibold">{title}</Text>
        <Icon as={isOpen ? ChevronUpIcon : ChevronDownIcon} boxSize={5} />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box pt={2} pb={4}>
          {children}
        </Box>
      </Collapse>
      <Divider />
    </Box>
  );

  // Count total active filters
  const countActiveFilters = () => {
    let count = 0;
    
    if (localFilters.category) count++;
    if (localFilters.subcategory) count++;
    if (localFilters.nestedSubcategory) count++;
    if (localFilters.size?.length) count += localFilters.size.length;
    if (localFilters.fabrics?.length) count += localFilters.fabrics.length;
    if (localFilters.fit) count++;
    if (localFilters.pattern) count++;
    if (localFilters.colors?.length) count += localFilters.colors.length;
    if (localFilters.minPrice !== 200 || localFilters.maxPrice !== 3000) count++;
    
    return count;
  };
  
  const totalActiveFilters = countActiveFilters();

  // Sidebar content - reused in both desktop and mobile views
  const filterContent = (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h3" size="md">Filters</Heading>
        {totalActiveFilters > 0 && (
          <Button 
            variant="ghost" 
            colorScheme="gray" 
            size="sm" 
            onClick={resetFilters}
          >
            Clear all
          </Button>
        )}
      </Flex>

      {/* Categories */}
      <FilterSection 
        title="Category" 
        isOpen={categoryDisclosure.isOpen} 
        onToggle={categoryDisclosure.onToggle}
      >
        <RadioGroup 
          value={localFilters.category} 
          onChange={(value) => {
            setLocalFilters(prev => ({
              ...prev,
              category: value,
              subcategory: "",  // Reset subcategory when category changes
              nestedSubcategory: ""  // Reset nested subcategory
            }));
          }}
        >
          <VStack align="flex-start" spacing={2}>
            {availableFilters.categories.map(category => (
              <Radio key={category} value={category}>
                {category}
              </Radio>
            ))}
          </VStack>
        </RadioGroup>
      </FilterSection>

      {/* Subcategories - only show if a category is selected */}
      {localFilters.category && (
        <FilterSection 
          title="Subcategory" 
          isOpen={true} 
          onToggle={() => {}}
        >
          <RadioGroup 
            value={localFilters.subcategory} 
            onChange={(value) => {
              setLocalFilters(prev => ({
                ...prev,
                subcategory: value,
                nestedSubcategory: ""  // Reset nested subcategory when subcategory changes
              }));
            }}
          >
            <VStack align="flex-start" spacing={2}>
              {getRelevantSubcategories().map(subcategory => (
                <Radio key={subcategory} value={subcategory}>
                  {subcategory}
                </Radio>
              ))}
            </VStack>
          </RadioGroup>
        </FilterSection>
      )}

      {/* Nested Subcategories - only show if a subcategory is selected */}
      {localFilters.subcategory && (
        <FilterSection 
          title="Type" 
          isOpen={true} 
          onToggle={() => {}}
        >
          <RadioGroup 
            value={localFilters.nestedSubcategory} 
            onChange={(value) => updateLocalFilter('nestedSubcategory', value)}
          >
            <VStack align="flex-start" spacing={2}>
              {getRelevantNestedSubcategories().map(nestedSubcategory => (
                <Radio key={nestedSubcategory} value={nestedSubcategory}>
                  {nestedSubcategory}
                </Radio>
              ))}
            </VStack>
          </RadioGroup>
        </FilterSection>
      )}

      {/* Sizes */}
      <FilterSection 
        title="Size" 
        isOpen={sizeDisclosure.isOpen} 
        onToggle={sizeDisclosure.onToggle}
      >
        <HStack spacing={2} flexWrap="wrap">
          {availableFilters.sizes.map(size => (
            <Button
              key={size}
              size="sm"
              variant={localFilters.size?.includes(size) ? "solid" : "outline"}
              colorScheme={localFilters.size?.includes(size) ? "blue" : "gray"}
              onClick={() => handleArrayFilterToggle(size, 'size')}
              minW="40px"
              mb={2}
            >
              {size}
            </Button>
          ))}
        </HStack>
      </FilterSection>

      {/* Fabrics */}
      <FilterSection 
        title="Fabric" 
        isOpen={fabricDisclosure.isOpen} 
        onToggle={fabricDisclosure.onToggle}
      >
        <VStack align="flex-start" spacing={2}>
          {availableFilters.fabrics.map(fabric => (
            <Checkbox 
              key={fabric}
              isChecked={localFilters.fabrics?.includes(fabric)}
              onChange={() => handleArrayFilterToggle(fabric, 'fabrics')}
            >
              {fabric}
            </Checkbox>
          ))}
        </VStack>
      </FilterSection>

      {/* Fit */}
      <FilterSection 
        title="Fit" 
        isOpen={fitDisclosure.isOpen} 
        onToggle={fitDisclosure.onToggle}
      >
        <RadioGroup 
          value={localFilters.fit} 
          onChange={(value) => updateLocalFilter('fit', value)}
        >
          <VStack align="flex-start" spacing={2}>
            {availableFilters.fits.map(fit => (
              <Radio key={fit} value={fit}>
                {fit}
              </Radio>
            ))}
          </VStack>
        </RadioGroup>
      </FilterSection>

      {/* Pattern */}
      <FilterSection 
        title="Pattern" 
        isOpen={patternDisclosure.isOpen} 
        onToggle={patternDisclosure.onToggle}
      >
        <RadioGroup 
          value={localFilters.pattern} 
          onChange={(value) => updateLocalFilter('pattern', value)}
        >
          <VStack align="flex-start" spacing={2}>
            {availableFilters.patterns.map(pattern => (
              <Radio key={pattern} value={pattern}>
                {pattern}
              </Radio>
            ))}
          </VStack>
        </RadioGroup>
      </FilterSection>

      {/* Colors */}
      <FilterSection 
        title="Color" 
        isOpen={colorDisclosure.isOpen} 
        onToggle={colorDisclosure.onToggle}
      >
        <HStack spacing={2} flexWrap="wrap">
          {availableFilters.colors.map(color => (
            <Button
              key={color}
              size="sm"
              variant={localFilters.colors?.includes(color) ? "solid" : "outline"}
              colorScheme={localFilters.colors?.includes(color) ? "blue" : "gray"}
              onClick={() => handleArrayFilterToggle(color, 'colors')}
              mb={2}
            >
              {color}
            </Button>
          ))}
        </HStack>
      </FilterSection>

      {/* Price Range */}
      <FilterSection 
        title="Price Range" 
        isOpen={priceDisclosure.isOpen} 
        onToggle={priceDisclosure.onToggle}
      >
        <Box px={2}>
          <RangeSlider
            aria-label={['min', 'max']}
            min={200}
            max={3000}
            step={100}
            value={[localFilters.minPrice, localFilters.maxPrice]}
            onChange={([min, max]) => {
              setLocalFilters(prev => ({
                ...prev,
                minPrice: min,
                maxPrice: max
              }));
            }}
            mb={4}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
          
          <Flex justify="space-between">
            <Input 
              value={localFilters.minPrice}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 200;
                setLocalFilters(prev => ({
                  ...prev,
                  minPrice: Math.max(200, Math.min(value, localFilters.maxPrice))
                }));
              }}
              size="sm"
              width="80px"
              type="number"
            />
            <Text pt={1}>to</Text>
            <Input
              value={localFilters.maxPrice}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 3000;
                setLocalFilters(prev => ({
                  ...prev,
                  maxPrice: Math.min(3000, Math.max(value, localFilters.minPrice))
                }));
              }}
              size="sm"
              width="80px"
              type="number"
            />
          </Flex>
        </Box>
      </FilterSection>

      {/* Apply Filters Button */}
      <Box pt={4}>
        <Button 
          colorScheme="blue" 
          width="full" 
          onClick={handleApplyFilters}
          isLoading={isLoading}
        >
          Apply Filters
          {totalActiveFilters > 0 && ` (${totalActiveFilters})`}
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <Box 
        display={{ base: 'block', md: 'none' }} 
        position="sticky" 
        top="0" 
        zIndex="10"
        bg="white" 
        p={3} 
        borderBottom="1px" 
        borderColor="gray.200"
      >
        <Button 
          leftIcon={<FilterIcon size={18} />} 
          onClick={onToggle} 
          variant="outline"
          width="full"
        >
          Filters {totalActiveFilters > 0 && `(${totalActiveFilters})`}
        </Button>
      </Box>

      {/* Mobile Sidebar */}
      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'none' }}
        position="fixed"
        top="0"
        left="0"
        w="100%"
        h="100vh"
        bg="white"
        zIndex="modal"
        overflow="auto"
        p={4}
      >
        <Flex justify="space-between" align="center" mb={4}>
          <Heading as="h2" size="lg">Filters</Heading>
          <Icon 
            as={SidebarCloseIcon} 
            onClick={onClose} 
            cursor="pointer"
            boxSize={5}
          />
        </Flex>
        {filterContent}
      </Box>

      {/* Desktop Sidebar */}
      <Box
        as="aside"
        display={{ base: 'none', md: 'block' }}
        w="280px"
        bg="white"
        p={4}
        borderRight="1px"
        borderColor="gray.200"
        h="100%"
        overflow="auto"
      >
        {filterContent}
      </Box>
    </>
  );
};

export default FilterSidebar;