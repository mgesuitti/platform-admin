import 
{   TableHead,
    TableRow,
    TableCell,
    TableSortLabel,
    Box,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import IData from '../IData';
import { Order } from '../orderColumns.ENUM';
interface HeadCell {
    id: keyof IData;
    label: string;
  }
  
  const headCells: HeadCell[] = [
    {
      id: 'name',
      label: 'CompanyName',
    },
    {
      id: 'CUIT',
      label: 'CUIT',
    },
    {
      id: 'razonSocial',
      label: 'BusinessName',
    },
    {
      id: 'teammates',
      label: 'Teammates',
    },
    {
      id: 'usedspace',
      label: 'Used Space [GB]',
    },
    {
      id: 'totalfiles',
      label: 'Files',
    },
  ];

interface ICompanyTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IData) => void;
    order: Order;
    orderBy: string;
  }
  
  function CompanyTableHead(props: ICompanyTableProps) {
    const {order, orderBy, onRequestSort } =
      props;
    const createSortHandler =
      (property: keyof IData) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={'center'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  export default CompanyTableHead;
  