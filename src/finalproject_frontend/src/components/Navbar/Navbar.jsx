import React, { useState } from "react";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,

  Button,

  MenuItem,
  TextField,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const pages = ["ADOPT", "PETS", "ABOUT"];

function ResponsiveAppBar(event) {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar
      position="static"
      style={{ padding: "0px", margin: "0px", marginBottom:"10px" , borderRadius: "50px", boxShadow: "none", border: "2px solid #B5C0D0"}}
      sx={{ backgroundColor: '#FEF9F5'}}
      maxwidth="lg"
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 10,
              display: { xs: "none", md: "flex" },
              fontFamily: "sans-serif",
              fontWeight: 900,
              letterSpacing: ".2rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            dPett 🐶
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" >{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            dPett
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <TextField
            sx={[ {mr :2 }, { display: { xs: "none", md: "flex" } }]}
            id="search-bar"
            className="text"
            label=""
            variant="outlined"
            placeholder="Search..."
            size="small"
            InputProps={{
              style: { color: "black", borderColor: "white", display: "flex" },
              startAdornment: (
                <IconButton
                  sx={{ display: { xs: "none", md: "flex" } }}
                  type="submit"
                  aria-label="search"
                >
                  <SearchIcon style={{ fill: "white" }} />
                </IconButton>
              ),
            }}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
